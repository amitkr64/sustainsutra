/**
 * BRSR Data Quality & Assurance Engine
 * 
 * Analyzes the raw BRSR data (indicators) to assess data quality,
 * completeness, and consistency.
 */

export const analyzeDataQuality = (report) => {
    const indicators = report.indicators || {};
    const issues = [];
    let passedChecks = 0;
    let totalChecks = 0;

    // Helper to log issue
    const addIssue = (type, message, severity = 'medium', field = null) => {
        issues.push({ type, message, severity, field });
    };

    // Helper to check validity
    const check = (condition, successPoints = 1) => {
        totalChecks += successPoints;
        if (condition) passedChecks += successPoints;
        return condition;
    };

    // --- SECTION A: General & Financials ---
    // Critical: Turnover must be present and positive
    if (!check(indicators.turnover > 0, 5)) {
        addIssue('Completeness', 'Annual Turnover is missing or zero.', 'critical', 'turnover');
    }

    // Critical: Net Worth
    if (!check(indicators.net_worth > 0, 3)) {
        addIssue('Completeness', 'Net Worth is missing or zero.', 'high', 'net_worth');
    }

    // --- SECTION B: Management & Process ---
    // Check if policies are defined (assuming boolean or string presence for policy fields if they exist in indicators)
    // Note: This matches generic policy fields if available. Adjust keys based on actual extraction.

    // --- SECTION C: Principle Wise Performance ---

    // Principle 3: Employees (Critical)
    const totalEmployees = Number(indicators.p3_total_employees) || 0;
    const femaleEmployees = Number(indicators.p3_female_employees) || 0;
    const maleEmployees = Number(indicators.p3_male_employees) || 0;

    if (!check(totalEmployees > 0, 5)) {
        addIssue('Completeness', 'Total Employee count is missing.', 'critical', 'p3_total_employees');
    } else {
        // Consistency: Male + Female <= Total (allow small margin for others)
        if (maleEmployees + femaleEmployees > totalEmployees) {
            check(false, 3);
            addIssue('Consistency', 'Sum of Male & Female employees exceeds Total Employee count.', 'high', 'p3_employees');
        } else {
            check(true, 3);
        }

        // Diversity Warning
        if (femaleEmployees === 0) {
            addIssue('warning', 'Deep Dive: Zero female employees reported. Verify if accurate.', 'medium', 'p3_female_employees');
        }
    }

    // Principle 6: Environment (Energy & Emissions)
    // Use _base values for GHG (already converted to tCO2 by parser) with fallback
    const energy = Number(indicators.p6_total_energy_mj) || 0;
    const scope1 = Number(indicators.p6_e7_scope1_fy_base || indicators.p6_scope1) || 0;
    const scope2 = Number(indicators.p6_e7_scope2_fy_base || indicators.p6_scope2) || 0;

    if (!check(energy > 0, 5)) {
        addIssue('Completeness', 'Total Energy Consumption (MJ) is missing.', 'critical', 'p6_total_energy_mj');
    }

    if (!check(scope1 > 0 || scope2 > 0, 5)) {
        addIssue('Completeness', 'GHG Emissions (Scope 1 & 2) not reported.', 'critical', 'p6_emissions');
    }

    // Consistency: Energy vs Emissions
    // If Energy is high but Emissions are 0, that's impossible unless 100% renewable (unlikely without Scope 2)
    if (energy > 1000000 && scope1 === 0 && scope2 === 0) {
        addIssue('Consistency', 'High Energy Consumption reported but Zero Emissions. This is highly anomalous.', 'critical', 'p6_consistency');
    }

    // Water
    const waterWithdrawal = Number(indicators.p6_water_withdrawal) || 0;
    const waterConsumption = Number(indicators.p6_water_consumption) || 0;

    if (!check(waterWithdrawal > 0, 3)) {
        addIssue('Completeness', 'Water Withdrawal data missing.', 'medium', 'p6_water_withdrawal');
    }

    if (waterConsumption > waterWithdrawal) {
        check(false, 3);
        addIssue('Consistency', 'Water Consumption exceeds Withdrawal.', 'high', 'p6_water_consistency');
    } else {
        check(true, 3);
    }

    // Waste
    const wasteGenerated = Number(indicators.p6_waste_generated) || 0;
    if (!check(wasteGenerated > 0, 3)) {
        addIssue('Completeness', 'Total Waste Generated data missing.', 'medium', 'p6_waste_generated');
    }

    // Principle 9: Customers
    const complaints = indicators.p9_consumer_complaints;
    if (!check(complaints !== undefined && complaints !== null, 2)) {
        addIssue('Completeness', 'Consumer Complaints data missing (enter 0 if none).', 'medium', 'p9_consumer_complaints');
    }

    // CSR
    const csrSpend = indicators.csr_spend_amount; // Assuming key
    if (indicators.turnover > 1000000000 && (csrSpend === undefined || csrSpend === null)) {
        addIssue('Completeness', 'CSR Spend details missing for high turnover entity.', 'medium', 'csr_spend');
    }

    // Assurance (Quality Bonus)
    const isAssured = indicators.assurance_applicable === 'Yes' || indicators.assurance_applicable === true;
    if (check(isAssured, 2)) {
        // Bonus for having external assurance
    } else {
        addIssue('Assurance', 'No external assurance reported for BRSR Core.', 'medium', 'assurance');
    }

    // Comprehensive Sections Check
    const hasWaterSources = (Number(indicators.water_surface) || 0) + (Number(indicators.water_ground) || 0) + (Number(indicators.water_third_party) || 0) > 0;
    if (indicators.p6_water_withdrawal > 0 && !check(hasWaterSources, 2)) {
        addIssue('Granularity', 'Total Water Withdrawal reported but source-wise breakdown is missing.', 'medium', 'water_sources');
    }

    // Calculate Scores
    const qualityScore = totalChecks === 0 ? 0 : Math.round((passedChecks / totalChecks) * 100);

    // Categorize Issues
    const criticalIssues = issues.filter(i => i.severity === 'critical');
    const highIssues = issues.filter(i => i.severity === 'high');
    const warnings = issues.filter(i => i.severity === 'medium' || i.severity === 'low');

    return {
        score: qualityScore,
        issues,
        counts: {
            critical: criticalIssues.length,
            high: highIssues.length,
            warnings: warnings.length,
            total: issues.length
        },
        status: qualityScore > 90 ? 'Excellent' : qualityScore > 75 ? 'Good' : qualityScore > 50 ? 'Fair' : 'Poor'
    };
};
