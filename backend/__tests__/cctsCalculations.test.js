const {
    calculateTotalGHG,
    calculateGEI,
    calculateCCC,
} = require('../services/cctsCalculations');

describe('CCTS Calculation Engine', () => {

    describe('calculateTotalGHG', () => {
        it('calculates direct combustion from fuels (non-GJ unit)', () => {
            const data = {
                fuels: [{ fuelType: 'Coal', quantity: 100, unit: 'tonnes', ncv: 25, emissionFactor: 1.9, isBiomass: false }],
            };
            const result = calculateTotalGHG(data);
            // emission = quantity * ncv * ef = 100 * 25 * 1.9 = 4750
            expect(result.directCombustion).toBe(4750);
            expect(result.totalDirect).toBe(4750);
            expect(result.netTotal).toBe(4750);
        });

        it('calculates direct combustion from fuels (GJ unit)', () => {
            const data = {
                fuels: [{ fuelType: 'Natural Gas', quantity: 500, unit: 'GJ', ncv: 1, emissionFactor: 0.055, isBiomass: false }],
            };
            const result = calculateTotalGHG(data);
            // emission = quantity * ef (energy already in GJ) = 500 * 0.055 = 27.5
            expect(result.directCombustion).toBe(27.5);
        });

        it('skips biomass fuels in combustion', () => {
            const data = {
                fuels: [
                    { fuelType: 'Coal', quantity: 100, unit: 'tonnes', ncv: 25, emissionFactor: 1.9, isBiomass: false },
                    { fuelType: 'Biomass', quantity: 50, unit: 'tonnes', ncv: 15, emissionFactor: 0.5, isBiomass: true },
                ],
            };
            const result = calculateTotalGHG(data);
            expect(result.directCombustion).toBe(4750); // only coal
        });

        it('calculates process emissions from raw materials', () => {
            const data = {
                rawMaterials: [{ name: 'Limestone', quantity: 1000, emissionFactor: 0.44, isBiomass: false }],
            };
            const result = calculateTotalGHG(data);
            // emission = quantity * ef = 1000 * 0.44 = 440
            expect(result.directProcess).toBe(440);
            expect(result.directCombustion).toBe(0);
        });

        it('calculates indirect electricity emissions', () => {
            const data = {
                purchasedElectricity: { grid: 500, openAccess: 200, renewable: 100, emissionFactor: 0.82 },
            };
            const result = calculateTotalGHG(data);
            // (grid + openAccess) * ef = (500 + 200) * 0.82 = 574
            expect(result.indirectElectricity).toBe(574);
        });

        it('uses default emission factor 0.82 when not specified', () => {
            const data = {
                purchasedElectricity: { grid: 1000 },
            };
            const result = calculateTotalGHG(data);
            // 1000 * 0.82 = 820
            expect(result.indirectElectricity).toBe(820);
        });

        it('deducts exported energy', () => {
            const data = {
                purchasedElectricity: { grid: 1000, emissionFactor: 0.82 },
                exportedEnergy: { electricity: 200, heat: 0, emissionFactorElectricity: 0.82 },
            };
            const result = calculateTotalGHG(data);
            // indirect = 1000 * 0.82 = 820; deduction = 200 * 0.82 = 164
            expect(result.indirectElectricity).toBe(820);
            expect(result.exportedEnergy).toBe(164);
            expect(result.netTotal).toBe(656); // 820 - 164
        });

        it('deducts captured CO2', () => {
            const data = {
                fuels: [{ fuelType: 'Coal', quantity: 100, unit: 'tonnes', ncv: 25, emissionFactor: 1.9 }],
                capturedCO2: { quantity: 1000 },
            };
            const result = calculateTotalGHG(data);
            // direct = 4750; captured = 1000; net = 3750
            expect(result.netTotal).toBe(3750);
        });

        it('handles empty data gracefully', () => {
            const result = calculateTotalGHG({});
            expect(result.netTotal).toBe(0);
            expect(result.totalDirect).toBe(0);
            expect(result.totalIndirect).toBe(0);
        });

        it('combines all emission sources and deductions correctly', () => {
            const data = {
                fuels: [{ fuelType: 'Diesel', quantity: 200, unit: 'litres', ncv: 0.035, emissionFactor: 2.6 }],
                rawMaterials: [{ name: 'Cement', quantity: 5000, emissionFactor: 0.5 }],
                purchasedElectricity: { grid: 2000, emissionFactor: 0.82 },
                exportedEnergy: { electricity: 500, emissionFactorElectricity: 0.82 },
                capturedCO2: { quantity: 200 },
            };
            const result = calculateTotalGHG(data);
            // directCombustion = 200 * 0.035 * 2.6 = 18.2
            // directProcess = 5000 * 0.5 = 2500
            // indirectElectricity = 2000 * 0.82 = 1640
            // exportedDeduction = 500 * 0.82 = 410
            // capturedDeduction = 200
            // netTotal = (18.2 + 2500) + 1640 - (410 + 200) = 3548.2
            expect(result.directCombustion).toBeCloseTo(18.2, 2);
            expect(result.directProcess).toBe(2500);
            expect(result.totalDirect).toBeCloseTo(2518.2, 2);
            expect(result.indirectElectricity).toBe(1640);
            expect(result.deductions).toBe(610);
            expect(result.netTotal).toBeCloseTo(3548.2, 2);
        });
    });

    describe('calculateGEI', () => {
        it('calculates GHG emission intensity', () => {
            const production = [{ quantity: 1000, equivalentFactor: 1 }];
            const result = calculateGEI(5000, production);
            // GEI = 5000 / 1000 = 5
            expect(result.gei).toBe(5);
            expect(result.totalEquivalentProduction).toBe(1000);
        });

        it('applies equivalent factors for multi-product production', () => {
            const production = [
                { quantity: 5000, equivalentFactor: 1 },
                { quantity: 2000, equivalentFactor: 0.5 },
            ];
            const result = calculateGEI(12000, production);
            // total equiv = 5000 + 2000*0.5 = 6000; GEI = 12000 / 6000 = 2
            expect(result.totalEquivalentProduction).toBe(6000);
            expect(result.gei).toBe(2);
        });

        it('throws on empty production', () => {
            expect(() => calculateGEI(5000, [])).toThrow('Production data is required');
        });

        it('throws on zero total production', () => {
            expect(() => calculateGEI(5000, [{ quantity: 0, equivalentFactor: 1 }])).toThrow('cannot be zero');
        });
    });

    describe('calculateCCC', () => {
        const entity = {
            baselineGHGIntensity: 2.0,
            targets: [{ complianceYear: '2024-25', targetGEI: 1.5 }],
        };

        it('issues credits when entity outperforms target', () => {
            const result = calculateCCC(entity, 1.2, 10000, '2024-25');
            // issuance = (1.5 - 1.2) * 10000 = 3000
            expect(result.creditIssuance).toBe(3000);
            expect(result.surrenderRequirement).toBe(0);
            expect(result.netPosition).toBe(3000);
            expect(result.complianceStatus).toBe('Compliant');
            expect(result.performance).toBe('Outperformed');
        });

        it('requires surrender when entity underperforms target', () => {
            const result = calculateCCC(entity, 1.8, 10000, '2024-25');
            // surrender = (1.8 - 1.5) * 10000 = 3000
            expect(result.surrenderRequirement).toBe(3000);
            expect(result.creditIssuance).toBe(0);
            expect(result.netPosition).toBe(-3000);
            expect(result.complianceStatus).toBe('Non-Compliant');
            expect(result.performance).toBe('Underperformed');
        });

        it('handles exact target achievement', () => {
            const result = calculateCCC(entity, 1.5, 10000, '2024-25');
            expect(result.creditIssuance).toBe(0);
            expect(result.surrenderRequirement).toBe(0);
            expect(result.complianceStatus).toBe('Compliant');
            expect(result.performance).toBe('Met Target');
        });

        it('calculates baseline improvement percentage', () => {
            const result = calculateCCC(entity, 1.2, 10000, '2024-25');
            // improvement = (2.0 - 1.2) / 2.0 * 100 = 40%
            expect(result.baselineImprovement).toBe(40);
        });

        it('throws when no target exists for compliance year', () => {
            expect(() => calculateCCC(entity, 1.5, 10000, '2030-31')).toThrow('No target');
        });
    });
});
