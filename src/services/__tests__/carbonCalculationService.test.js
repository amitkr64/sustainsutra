import { describe, it, expect } from 'vitest';
import { carbonCalculationService, scope3Categories } from '../carbonCalculationService';

describe('carbonCalculationService', () => {
    describe('calculateActivity', () => {
        it('calculates CO2e directly when gas is CO2e', () => {
            const ef = { value: 0.82, gas: 'CO2e', unit: 'kgCO2e/kWh' };
            const result = carbonCalculationService.calculateActivity(1000, ef);
            expect(result).toBe(820);
        });

        it('calculates with GWP conversion for non-CO2e gases', () => {
            const ef = { value: 0.5, gas: 'CH4', gwp: 27.9 };
            // (100 * 0.5 * 27.9) / 100 = 13.95
            const result = carbonCalculationService.calculateActivity(100, ef);
            expect(result).toBeCloseTo(13.95, 4);
        });

        it('defaults GWP to 1 when not specified', () => {
            const ef = { value: 2.0, gas: 'CO2' };
            // (100 * 2.0 * 1) / 100 = 2
            const result = carbonCalculationService.calculateActivity(100, ef);
            expect(result).toBe(2);
        });

        it('handles unit containing CO2e string', () => {
            const ef = { value: 1.5, gas: 'N2O', unit: 'tCO2e/unit' };
            const result = carbonCalculationService.calculateActivity(100, ef);
            expect(result).toBe(150);
        });

        it('returns 0 for zero quantity', () => {
            const ef = { value: 5, gas: 'CO2e' };
            expect(carbonCalculationService.calculateActivity(0, ef)).toBe(0);
        });
    });

    describe('calculateScope', () => {
        it('sums emissions across multiple activities', () => {
            const activities = [
                { quantity: 100, emissionFactor: { value: 2, gas: 'CO2e' } },
                { quantity: 50, emissionFactor: { value: 3, gas: 'CO2e' } },
                { quantity: 200, emissionFactor: { value: 0.5, gas: 'CO2e' } },
            ];
            const result = carbonCalculationService.calculateScope(activities);
            // 200 + 150 + 100 = 450
            expect(result).toBe(450);
        });

        it('returns 0 for empty activities', () => {
            expect(carbonCalculationService.calculateScope([])).toBe(0);
        });
    });

    describe('calculateFootprint', () => {
        it('aggregates all three scopes', () => {
            const data = {
                scope1: [{ quantity: 100, emissionFactor: { value: 2, gas: 'CO2e' } }],
                scope2: [{ quantity: 500, emissionFactor: { value: 0.82, gas: 'CO2e' } }],
                scope3: [{ quantity: 1000, emissionFactor: { value: 0.1, gas: 'CO2e' } }],
            };
            const result = carbonCalculationService.calculateFootprint(data);
            expect(result.scope1).toBe(200);
            expect(result.scope2).toBe(410);
            expect(result.scope3).toBe(100);
            expect(result.total).toBe(710);
        });

        it('handles missing scopes as 0', () => {
            const result = carbonCalculationService.calculateFootprint({});
            expect(result.total).toBe(0);
        });
    });

    describe('scope3Categories', () => {
        it('has all 15 Scope 3 categories', () => {
            expect(scope3Categories).toHaveLength(15);
            expect(scope3Categories[0].id).toBe('cat1');
            expect(scope3Categories[14].id).toBe('cat15');
        });

        it('each category has an id and name', () => {
            scope3Categories.forEach(cat => {
                expect(cat.id).toBeTruthy();
                expect(cat.name).toBeTruthy();
                expect(typeof cat.name).toBe('string');
            });
        });
    });
});
