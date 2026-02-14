/**
 * Greenwashing Detection Utility
 * 
 * Analyzes BRSR report data to flag potential greenwashing indicators.
 * Returns an array of flags with severity for dashboard display.
 */

const SEVERITY = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
};

/**
 * Analyze report data for greenwashing indicators
 * @param {Object} report - The BRSR analysis report object { indicators, metrics }
 * @returns {Object} - { riskScore: number, flags: Array<{ principle, flag, severity, explanation }> }
 */
export function analyzeGreenwashing(report) {
    const { indicators = {}, metrics = {} } = report;
    const flags = [];

    // --- P1: Ethics & Governance ---
    if (!indicators.assurance_applicable || indicators.assurance_applicable === 'No') {
        flags.push({
            principle: 'P1',
            flag: 'No External Assurance',
            severity: SEVERITY.MEDIUM,
            explanation: 'The report lacks external assurance, which reduces credibility of sustainability claims.'
        });
    }

    // --- P3: Employee & Diversity ---
    const totalEmployees = indicators.p3_total_employees || 0;
    const femaleEmployees = indicators.p3_total_employees_female || 0;
    const femaleDirectors = indicators.p3_female_directors || 0;
    const femaleKMP = indicators.p3_female_kmp || 0;

    if (totalEmployees > 0 && femaleEmployees === 0) {
        flags.push({
            principle: 'P3',
            flag: 'Zero Female Employees Reported',
            severity: SEVERITY.HIGH,
            explanation: 'The report indicates no female employees, which is unusual and may indicate incomplete data.'
        });
    }

    if (femaleDirectors === 0 && femaleKMP === 0) {
        flags.push({
            principle: 'P3',
            flag: 'No Female Leadership',
            severity: SEVERITY.MEDIUM,
            explanation: 'No female representation on the Board or in Key Management Personnel.'
        });
    }

    // --- P6: Environment ---
    const renewableShare = metrics.renewableEnergyShare || 0;
    const totalEnergy = indicators.p6_e1_grand_total_fy || 0;
    const renewableEnergy = indicators.p6_e1_total_renew_fy || 0;

    // High claims but low performance
    if (totalEnergy > 0 && renewableShare < 10) {
        flags.push({
            principle: 'P6',
            flag: 'Low Renewable Energy Adoption',
            severity: SEVERITY.MEDIUM,
            explanation: `Only ${renewableShare.toFixed(1)}% of energy is from renewable sources.`
        });
    }

    // Missing granular data
    const totalWater = indicators.p6_e3_total_withdrawal_fy || 0;
    const waterSurface = indicators.water_surface || 0;
    const waterGround = indicators.water_ground || 0;
    const waterThirdParty = indicators.water_third_party || 0;

    if (totalWater > 0 && (waterSurface + waterGround + waterThirdParty) === 0) {
        flags.push({
            principle: 'P6',
            flag: 'Missing Water Source Breakdown',
            severity: SEVERITY.MEDIUM,
            explanation: 'Total water withdrawal is reported, but no breakdown by source (surface, ground, third-party) is provided.'
        });
    }

    // ZLD & Water Recycling
    const zldStatus = indicators.p6_zld_status;
    const waterRecycled = indicators.p6_water_recycled || 0;
    const waterReused = indicators.p6_water_reused || 0;

    if (totalWater > 1000 && zldStatus === 'No' && (waterRecycled + waterReused) < totalWater * 0.1) {
        flags.push({
            principle: 'P6',
            flag: 'Low Water Circularity',
            severity: SEVERITY.HIGH,
            explanation: 'Significant water withdrawal, but no Zero Liquid Discharge and less than 10% water is recycled/reused.'
        });
    }

    // Effluent Discharge without treatment info
    const effluentDischarged = indicators.p6_effluent_discharged || 0;
    const effluentTreated = indicators.effluent_treatment;

    if (effluentDischarged > 0 && (!effluentTreated || effluentTreated === 'No')) {
        flags.push({
            principle: 'P6',
            flag: 'Untreated Effluent Discharge',
            severity: SEVERITY.HIGH,
            explanation: 'Effluent is being discharged without confirmation of treatment.'
        });
    }

    // Emissions YoY increase (trend based)
    const ghgTrend = metrics.ghgTrend || 0;
    if (ghgTrend > 5) {
        flags.push({
            principle: 'P6',
            flag: 'Increasing GHG Emissions',
            severity: SEVERITY.MEDIUM,
            explanation: `GHG emissions increased by ${ghgTrend.toFixed(1)}% compared to the previous year.`
        });
    }

    // --- P8: Community ---
    const csrSpendPct = metrics.csrSpendPct || 0;
    if (csrSpendPct < 2 && indicators.turnover > 50000000) { // 5 Crore threshold
        flags.push({
            principle: 'P8',
            flag: 'Low CSR Spend',
            severity: SEVERITY.LOW,
            explanation: 'CSR spending is below the mandatory 2% threshold for large entities.'
        });
    }

    // Calculate Risk Score (0-100)
    let riskScore = 0;
    flags.forEach(f => {
        if (f.severity === SEVERITY.HIGH) riskScore += 25;
        else if (f.severity === SEVERITY.MEDIUM) riskScore += 15;
        else riskScore += 5;
    });
    riskScore = Math.min(100, riskScore);

    return {
        riskScore,
        riskLevel: riskScore >= 60 ? 'High Risk' : riskScore >= 30 ? 'Medium Risk' : 'Low Risk',
        flags
    };
}
