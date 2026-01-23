/**
 * CCTS Calculation Engine
 * Implements emission calculation formulas as per CCTS Guidelines
 */

/**
 * Calculate total GHG emissions from monitoring data
 * Formula: Total GHG = Direct Emissions + Indirect Emissions - Exported Energy - Captured CO2
 */
exports.calculateTotalGHG = (monitoringData) => {
    let directCombustion = 0;
    let directProcess = 0;
    let indirectElectricity = 0;
    let indirectHeat = 0;
    let exportedEnergyDeduction = 0;
    let capturedCO2Deduction = 0;

    // ==================== DIRECT EMISSIONS - COMBUSTION ====================

    // Calculate from fuels
    if (monitoringData.fuels && monitoringData.fuels.length > 0) {
        monitoringData.fuels.forEach(fuel => {
            if (!fuel.isBiomass) {
                // Emission = Quantity * NCV * Emission Factor
                // If EF is already per unit (not per GJ), adjust calculation
                let emission;

                if (fuel.unit === 'GJ') {
                    // Energy already in GJ
                    emission = fuel.quantity * fuel.emissionFactor;
                } else {
                    // Convert to energy first, then apply EF
                    const energyGJ = fuel.quantity * (fuel.ncv || 1);
                    emission = energyGJ * fuel.emissionFactor;
                }

                directCombustion += emission;
                fuel.totalEmissions = parseFloat(emission.toFixed(4));
            }
        });
    }

    // Calculate from raw materials (combustion-related)
    if (monitoringData.rawMaterials && monitoringData.rawMaterials.length > 0) {
        monitoringData.rawMaterials.forEach(material => {
            if (!material.isBiomass && material.ncv) {
                // Materials with NCV are fuels
                const energyGJ = material.quantity * material.ncv;
                const emission = energyGJ * material.emissionFactor;
                directCombustion += emission;
            } else if (!material.isBiomass) {
                // Process emissions from materials
                const emission = material.quantity * material.emissionFactor;
                directProcess += emission;
            }
        });
    }

    // ==================== INDIRECT EMISSIONS ====================

    // Electricity emissions
    if (monitoringData.purchasedElectricity) {
        const gridElectricity = monitoringData.purchasedElectricity.grid || 0;
        const openAccessElectricity = monitoringData.purchasedElectricity.openAccess || 0;
        const renewableElectricity = monitoringData.purchasedElectricity.renewable || 0;

        const emissionFactor = monitoringData.purchasedElectricity.emissionFactor || 0.82;

        // Grid and open access have emissions, renewable is zero
        indirectElectricity = (gridElectricity + openAccessElectricity) * emissionFactor;
        monitoringData.purchasedElectricity.totalEmissions = parseFloat(indirectElectricity.toFixed(4));
    }

    // Heat/Steam emissions
    if (monitoringData.purchasedHeat && monitoringData.purchasedHeat.quantity > 0) {
        const heatEmissionFactor = monitoringData.purchasedHeat.emissionFactor || 0.05;
        indirectHeat = monitoringData.purchasedHeat.quantity * heatEmissionFactor;
        monitoringData.purchasedHeat.totalEmissions = parseFloat(indirectHeat.toFixed(4));
    }

    // ==================== DEDUCTIONS ====================

    // Exported Energy
    if (monitoringData.exportedEnergy) {
        const exportedElectricity = monitoringData.exportedEnergy.electricity || 0;
        const exportedHeat = monitoringData.exportedEnergy.heat || 0;
        const efElectricity = monitoringData.exportedEnergy.emissionFactorElectricity || 0.82;
        const efHeat = monitoringData.exportedEnergy.emissionFactorHeat || 0.05;

        exportedEnergyDeduction = (exportedElectricity * efElectricity) + (exportedHeat * efHeat);
        monitoringData.exportedEnergy.totalDeduction = parseFloat(exportedEnergyDeduction.toFixed(4));
    }

    // Captured CO2 (CCUS)
    if (monitoringData.capturedCO2 && monitoringData.capturedCO2.quantity > 0) {
        capturedCO2Deduction = monitoringData.capturedCO2.quantity;
    }

    // ==================== TOTAL CALCULATION ====================

    const totalDirect = directCombustion + directProcess;
    const totalIndirect = indirectElectricity + indirectHeat;
    const totalDeductions = exportedEnergyDeduction + capturedCO2Deduction;
    const netTotal = totalDirect + totalIndirect - totalDeductions;

    const result = {
        directCombustion: parseFloat(directCombustion.toFixed(4)),
        directProcess: parseFloat(directProcess.toFixed(4)),
        indirectElectricity: parseFloat(indirectElectricity.toFixed(4)),
        indirectHeat: parseFloat(indirectHeat.toFixed(4)),
        totalDirect: parseFloat(totalDirect.toFixed(4)),
        totalIndirect: parseFloat(totalIndirect.toFixed(4)),
        exportedEnergy: parseFloat(exportedEnergyDeduction.toFixed(4)),
        capturedCO2: parseFloat(capturedCO2Deduction.toFixed(4)),
        deductions: parseFloat(totalDeductions.toFixed(4)),
        netTotal: parseFloat(netTotal.toFixed(4))
    };

    return result;
};

/**
 * Calculate GHG Emission Intensity (GEI)
 * Formula: GEI = Total GHG Emissions / Total Equivalent Production
 */
exports.calculateGEI = (totalGHGEmissions, production) => {
    if (!production || production.length === 0) {
        throw new Error('Production data is required to calculate GEI');
    }

    // Calculate total equivalent production
    const totalEquivalentProduction = production.reduce((sum, product) => {
        const equivalentFactor = product.equivalentFactor || 1;
        return sum + (product.quantity * equivalentFactor);
    }, 0);

    if (totalEquivalentProduction === 0) {
        throw new Error('Total production cannot be zero');
    }

    const gei = totalGHGEmissions / totalEquivalentProduction;

    return {
        gei: parseFloat(gei.toFixed(6)),
        totalEquivalentProduction: parseFloat(totalEquivalentProduction.toFixed(2))
    };
};

/**
 * Calculate Carbon Credit Certificates (CCC) - Issuance or Surrender
 * Formula:
 * If achievedGEI < targetGEI: Issuance = (targetGEI - achievedGEI) * Production
 * If achievedGEI > targetGEI: Surrender = (achievedGEI - targetGEI) * Production
 */
exports.calculateCCC = (entity, achievedGEI, totalProduction, complianceYear) => {
    // Find target for the compliance year
    const target = entity.targets.find(t => t.complianceYear === complianceYear);

    if (!target) {
        throw new Error(`No target set for compliance year ${complianceYear}`);
    }

    const targetGEI = target.targetGEI;
    const intensityDifference = parseFloat((targetGEI - achievedGEI).toFixed(6));

    let result = {
        baselineGEI: entity.baselineGHGIntensity,
        targetGEI: targetGEI,
        achievedGEI: parseFloat(achievedGEI.toFixed(6)),
        intensityDifference: intensityDifference,
        totalProduction: totalProduction,
        creditIssuance: 0,
        surrenderRequirement: 0,
        netPosition: 0,
        complianceStatus: 'Pending',
        performance: ''
    };

    if (achievedGEI < targetGEI) {
        // Outperformed - Entity gets credits
        const creditIssuance = (targetGEI - achievedGEI) * totalProduction;
        result.creditIssuance = parseFloat(creditIssuance.toFixed(2));
        result.netPosition = result.creditIssuance;
        result.complianceStatus = 'Compliant';
        result.performance = 'Outperformed';
    } else if (achievedGEI > targetGEI) {
        // Underperformed - Entity must surrender credits
        const surrenderRequirement = (achievedGEI - targetGEI) * totalProduction;
        result.surrenderRequirement = parseFloat(surrenderRequirement.toFixed(2));
        result.netPosition = -result.surrenderRequirement;
        result.complianceStatus = 'Non-Compliant';
        result.performance = 'Underperformed';
    } else {
        // Exactly met target
        result.complianceStatus = 'Compliant';
        result.performance = 'Met Target';
    }

    // Calculate improvement percentage from baseline
    const baselineImprovement = ((entity.baselineGHGIntensity - achievedGEI) / entity.baselineGHGIntensity) * 100;
    result.baselineImprovement = parseFloat(baselineImprovement.toFixed(2));

    return result;
};

/**
 * Perform complete calculation pipeline for monitoring data
 */
exports.performCompleteCalculation = async (monitoringData, entity) => {
    try {
        // Step 1: Calculate total GHG emissions
        const emissionsBreakdown = this.calculateTotalGHG(monitoringData);

        // Step 2: Calculate GEI
        const geiResult = this.calculateGEI(emissionsBreakdown.netTotal, monitoringData.production);

        // Step 3: Calculate CCC if entity and compliance year provided
        let cccResult = null;
        if (entity && monitoringData.reportingPeriod && monitoringData.reportingPeriod.complianceYear) {
            cccResult = this.calculateCCC(
                entity,
                geiResult.gei,
                geiResult.totalEquivalentProduction,
                monitoringData.reportingPeriod.complianceYear
            );
        }

        // Update monitoring data with calculated values
        monitoringData.calculatedEmissions = emissionsBreakdown;
        monitoringData.totalGHGEmissions = emissionsBreakdown.netTotal;
        monitoringData.ghgEmissionIntensity = geiResult.gei;
        monitoringData.totalEquivalentProduction = geiResult.totalEquivalentProduction;
        monitoringData.lastCalculatedAt = new Date();

        return {
            success: true,
            emissions: emissionsBreakdown,
            gei: geiResult.gei,
            totalProduction: geiResult.totalEquivalentProduction,
            ccc: cccResult,
            message: 'Calculations completed successfully'
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Validate monitoring data before calculation
 */
exports.validateMonitoringData = (monitoringData) => {
    const errors = [];

    // Check production data
    if (!monitoringData.production || monitoringData.production.length === 0) {
        errors.push('Production data is required');
    }

    // Check if at least one emission source exists
    const hasFuels = monitoringData.fuels && monitoringData.fuels.length > 0;
    const hasMaterials = monitoringData.rawMaterials && monitoringData.rawMaterials.length > 0;
    const hasElectricity = monitoringData.purchasedElectricity &&
        (monitoringData.purchasedElectricity.grid > 0 || monitoringData.purchasedElectricity.openAccess > 0);
    const hasHeat = monitoringData.purchasedHeat && monitoringData.purchasedHeat.quantity > 0;

    if (!hasFuels && !hasMaterials && !hasElectricity && !hasHeat) {
        errors.push('At least one emission source (fuel, material, electricity, or heat) is required');
    }

    // Validate emission factors
    if (hasFuels) {
        monitoringData.fuels.forEach((fuel, index) => {
            if (!fuel.emissionFactor || fuel.emissionFactor <= 0) {
                errors.push(`Fuel #${index + 1} (${fuel.fuelType}) is missing a valid emission factor`);
            }
            if (!fuel.ncv || fuel.ncv <= 0) {
                errors.push(`Fuel #${index + 1} (${fuel.fuelType}) is missing a valid NCV`);
            }
        });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Calculate trajectory for multi-year compliance
 */
exports.calculateTrajectory = (entity, historicalData = []) => {
    const trajectory = [];

    // Add baseline
    trajectory.push({
        year: entity.baselineYear,
        type: 'baseline',
        gei: entity.baselineGHGIntensity,
        production: entity.baselineProduction
    });

    // Add targets
    entity.targets.forEach(target => {
        trajectory.push({
            year: target.complianceYear,
            type: 'target',
            gei: target.targetGEI,
            reductionFromBaseline: ((entity.baselineGHGIntensity - target.targetGEI) / entity.baselineGHGIntensity * 100).toFixed(2)
        });
    });

    // Add historical achieved data
    historicalData.forEach(data => {
        trajectory.push({
            year: data.complianceYear,
            type: 'achieved',
            gei: data.achievedGEI,
            production: data.totalProduction,
            emissions: data.totalGHGEmissions,
            complianceStatus: data.complianceStatus
        });
    });

    return trajectory.sort((a, b) => {
        const yearA = a.year.split('-')[0];
        const yearB = b.year.split('-')[0];
        return parseInt(yearA) - parseInt(yearB);
    });
};

module.exports = exports;
