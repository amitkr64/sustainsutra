import { describe, it, expect } from 'vitest';
import { applyBRSRCalculations } from '../brsrCalculations';

describe('applyBRSRCalculations', () => {
    it('calculates total national locations (plants + offices)', () => {
        const report = {
            number_of_plants_national: '5',
            number_of_offices_national: '3',
            number_of_plants_international: '2',
            number_of_offices_international: '1',
        };
        const result = applyBRSRCalculations(report);
        expect(result.total_number_of_locations_national).toBe('8');
        expect(result.total_number_of_locations_international).toBe('3');
    });

    it('handles string and numeric inputs', () => {
        const report = {
            number_of_plants_national: 10,
            number_of_offices_national: '5',
            number_of_plants_international: 0,
            number_of_offices_international: '0',
        };
        const result = applyBRSRCalculations(report);
        expect(result.total_number_of_locations_national).toBe('15');
        expect(result.total_number_of_locations_international).toBe('0');
    });

    it('handles missing/undefined values as 0', () => {
        const report = {
            number_of_plants_national: '7',
        };
        const result = applyBRSRCalculations(report);
        expect(result.total_number_of_locations_national).toBe('7');
        expect(result.total_number_of_locations_international).toBe('0');
    });

    it('calculates permanent employee totals and percentages', () => {
        const report = {
            number_of_male_permanent_employees: '60',
            number_of_female_permanent_employees: '30',
            number_of_other_permanent_employees: '10',
            // zero out other categories to avoid interference
            number_of_male_other_than_permanent_employees: '0',
            number_of_female_other_than_permanent_employees: '0',
            number_of_other_other_than_permanent_employees: '0',
            number_of_male_permanent_workers: '0',
            number_of_female_permanent_workers: '0',
            number_of_other_permanent_workers: '0',
            number_of_male_other_than_permanent_worker: '0',
            number_of_female_other_than_permanent_worker: '0',
            number_of_other_other_than_permanent_worker: '0',
        };
        const result = applyBRSRCalculations(report);
        // Total = 60 + 30 + 10 = 100
        expect(result.total_number_of_permanent_employees).toBe('100');
        // Percentages: male 60%, female 30%, other 10%
        expect(result.percentage_of_male_permanent_employees).toBe('60.00');
        expect(result.percentage_of_female_permanent_employees).toBe('30.00');
        expect(result.percentage_of_other_permanent_employees).toBe('10.00');
    });

    it('handles zero total (avoids division by zero)', () => {
        const report = {
            number_of_male_permanent_employees: '0',
            number_of_female_permanent_employees: '0',
            number_of_other_permanent_employees: '0',
            number_of_male_other_than_permanent_employees: '0',
            number_of_female_other_than_permanent_employees: '0',
            number_of_other_other_than_permanent_employees: '0',
            number_of_male_permanent_workers: '0',
            number_of_female_permanent_workers: '0',
            number_of_other_permanent_workers: '0',
            number_of_male_other_than_permanent_worker: '0',
            number_of_female_other_than_permanent_worker: '0',
            number_of_other_other_than_permanent_worker: '0',
        };
        const result = applyBRSRCalculations(report);
        expect(result.percentage_of_male_permanent_employees).toBe('0.00');
        expect(result.total_number_of_permanent_employees).toBe('0');
    });

    it('sums permanent + other employees vertically', () => {
        const report = {
            number_of_male_permanent_employees: '100',
            number_of_female_permanent_employees: '50',
            number_of_other_permanent_employees: '0',
            number_of_male_other_than_permanent_employees: '20',
            number_of_female_other_than_permanent_employees: '10',
            number_of_other_other_than_permanent_employees: '0',
            number_of_male_permanent_workers: '0',
            number_of_female_permanent_workers: '0',
            number_of_other_permanent_workers: '0',
            number_of_male_other_than_permanent_worker: '0',
            number_of_female_other_than_permanent_worker: '0',
            number_of_other_other_than_permanent_worker: '0',
        };
        const result = applyBRSRCalculations(report);
        // Total employees = 150 + 30 = 180
        expect(result.total_number_of_employees).toBe('180');
        expect(result.number_of_male_employees).toBe('120');
        expect(result.number_of_female_employees).toBe('60');
    });

    it('does not mutate the original report object', () => {
        const report = { number_of_plants_national: '3', number_of_offices_national: '2' };
        const original = { ...report };
        applyBRSRCalculations(report);
        // The function spreads report internally, so the original keys remain
        // but it does add new keys. The original input keys should be unchanged.
        expect(report.number_of_plants_national).toBe(original.number_of_plants_national);
        expect(report.number_of_offices_national).toBe(original.number_of_offices_national);
    });
});
