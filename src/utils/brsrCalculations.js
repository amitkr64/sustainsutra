
/**
 * Utility to perform automatic calculations for BRSR Matrix Tables
 * Handles:
 * - Section III (Operations): Plants + Offices = Total Locations
 * - Section IV (Employees): 
 *    1. Row Total (A) = Male(B) + Female(C) + Other(H)
 *    2. Column % = (Gender / Total A) * 100
 *    3. Total Row (D+E / F+G) = Row(Permanent) + Row(Other than permanent)
 */

export const applyBRSRCalculations = (report) => {
    const updated = { ...report };

    // Helper to get numeric value
    const val = (name) => {
        const v = updated[name];
        if (typeof v === 'string') return parseFloat(v) || 0;
        return parseFloat(v) || 0;
    };

    // Helper to set percentage string
    const setPct = (target, num, den) => {
        const total = parseFloat(den) || 0;
        if (total > 0) {
            updated[target] = ((parseFloat(num) || 0) / total * 100).toFixed(2);
        } else {
            updated[target] = "0.00";
        }
    };

    // --- SECTION III: OPERATIONS (Q19) ---
    updated.total_number_of_locations_national = (val('number_of_plants_national') + val('number_of_offices_national')).toString();
    updated.total_number_of_locations_international = (val('number_of_plants_international') + val('number_of_offices_international')).toString();

    // --- SECTION IV-A: EMPLOYEES & WORKERS ---

    const calculateDemographics = (baseName) => {
        const male = val(`number_of_male_${baseName}`);
        const female = val(`number_of_female_${baseName}`);
        const other = val(`number_of_other_${baseName}`);
        const total = male + female + other;

        updated[`total_number_of_${baseName}`] = total.toString();
        setPct(`percentage_of_male_${baseName}`, male, total);
        setPct(`percentage_of_female_${baseName}`, female, total);
        setPct(`percentage_of_other_${baseName}`, other, total);
        return { total, male, female, other };
    };

    // 1. Calculate base rows
    const permEmp = calculateDemographics("permanent_employees");
    const otherEmp = calculateDemographics("other_than_permanent_employees");
    const permWrk = calculateDemographics("permanent_workers");
    const otherWrk = calculateDemographics("other_than_permanent_worker");

    // 2. Vertical sums (Total Rows)
    // Employees (D + E)
    updated.total_number_of_employees = (permEmp.total + otherEmp.total).toString();
    updated.number_of_male_employees = (permEmp.male + otherEmp.male).toString();
    updated.number_of_female_employees = (permEmp.female + otherEmp.female).toString();
    updated.number_of_other_employees = (permEmp.other + otherEmp.other).toString();
    setPct('percentage_of_male_employees', updated.number_of_male_employees, updated.total_number_of_employees);
    setPct('percentage_of_female_employees', updated.number_of_female_employees, updated.total_number_of_employees);
    setPct('percentage_of_other_employees', updated.number_of_other_employees, updated.total_number_of_employees);

    // Workers (F + G)
    updated.total_number_of_workers = (permWrk.total + otherWrk.total).toString();
    updated.number_of_male_workers = (permWrk.male + otherWrk.male).toString();
    updated.number_of_female_workers = (permWrk.female + otherWrk.female).toString();
    updated.number_of_other_workers = (permWrk.other + otherWrk.other).toString();
    setPct('percentage_of_male_workers', updated.number_of_male_workers, updated.total_number_of_workers);
    setPct('percentage_of_female_workers', updated.number_of_female_workers, updated.total_number_of_workers);
    setPct('percentage_of_other_workers', updated.number_of_other_workers, updated.total_number_of_workers);

    // --- SECTION IV-B: DIFFERENTLY ABLED ---

    const calculateDiffAbled = (baseName) => {
        const male = val(`number_of_male_differently_abled_${baseName}`);
        const female = val(`number_of_female_differently_abled_${baseName}`);
        const other = val(`number_of_other_differently_abled_${baseName}`);
        const total = male + female + other;

        updated[`total_number_of_differently_abled_${baseName}`] = total.toString();
        setPct(`percentage_of_male_differently_abled_${baseName}`, male, total);
        setPct(`percentage_of_female_differently_abled_${baseName}`, female, total);
        setPct(`percentage_of_other_differently_abled_${baseName}`, other, total);
        return { total, male, female, other };
    };

    const diffPermEmp = calculateDiffAbled("permanent_employees");
    const diffOtherEmp = calculateDiffAbled("other_than_permanent_employees");
    const diffPermWrk = calculateDiffAbled("permanent_workers");
    const diffOtherWrk = calculateDiffAbled("other_than_permanent_workers");

    // Total Diff Abled Employees
    updated.total_number_of_differently_abled_employees = (diffPermEmp.total + diffOtherEmp.total).toString();
    updated.number_of_male_differently_abled_employees = (diffPermEmp.male + diffOtherEmp.male).toString();
    updated.number_of_female_differently_abled_employees = (diffPermEmp.female + diffOtherEmp.female).toString();
    updated.number_of_other_differently_abled_employees = (diffPermEmp.other + diffOtherEmp.other).toString();
    setPct('percentage_of_male_differently_abled_employees', updated.number_of_male_differently_abled_employees, updated.total_number_of_differently_abled_employees);
    setPct('percentage_of_female_differently_abled_employees', updated.number_of_female_differently_abled_employees, updated.total_number_of_differently_abled_employees);
    setPct('percentage_of_other_differently_abled_employees', updated.number_of_other_differently_abled_employees, updated.total_number_of_differently_abled_employees);

    // Total Diff Abled Workers
    updated.total_number_of_differently_abled_workers = (diffPermWrk.total + diffOtherWrk.total).toString();
    updated.number_of_male_differently_abled_workers = (diffPermWrk.male + diffOtherWrk.male).toString();
    updated.number_of_female_differently_abled_workers = (diffPermWrk.female + diffOtherWrk.female).toString();
    updated.number_of_other_differently_abled_workers = (diffPermWrk.other + diffOtherWrk.other).toString();
    setPct('percentage_of_male_differently_abled_workers', updated.number_of_male_differently_abled_workers, updated.total_number_of_differently_abled_workers);
    setPct('percentage_of_female_differently_abled_workers', updated.number_of_female_differently_abled_workers, updated.total_number_of_differently_abled_workers);
    setPct('percentage_of_other_differently_abled_workers', updated.number_of_other_differently_abled_workers, updated.total_number_of_differently_abled_workers);

    // --- SECTION IV-C: WOMEN PARTICIPATION (Q22) ---
    const calculateWomenParticipation = (id, baseName) => {
        const total = val(`total_number_of_women_${baseName}`);
        const female = val(`number_of_female_${baseName}`);
        setPct(`percentage_of_female_${baseName}`, female, total);
    };
    calculateWomenParticipation('bod', 'board_of_directors');
    calculateWomenParticipation('kmp', 'key_management_personnel');

    // --- SECTION IV-D: TURNOVER RATE (Q23) ---
    const calculateQ23FinalTotal = (rowId) => {
        ['fy1', 'fy2', 'fy3'].forEach(fy => {
            const male = val(`q23_${rowId}_male_${fy}`);
            const female = val(`q23_${rowId}_female_${fy}`);
            const other = val(`q23_${rowId}_other_${fy}`);
            updated[`q23_${rowId}_total_${fy}`] = (male + female + other).toFixed(2);
        });
    };

    ['emp', 'wrk'].forEach(rowId => calculateQ23FinalTotal(rowId));

    // --- SECTION C: PRINCIPLE 1 (Q8 - Accounts Payable) ---
    // Q8 is a table now. We need to fetch the JSON, calculate row_iii for FY and PY, and save back.
    const calculateQ8 = (jsonString) => {
        try {
            if (!jsonString || jsonString === '[]') return jsonString;
            const rows = JSON.parse(jsonString);
            if (!Array.isArray(rows)) return jsonString;

            // Find rows
            const r1 = rows.find(r => r.id === 'row_i');
            const r2 = rows.find(r => r.id === 'row_ii');
            const r3 = rows.find(r => r.id === 'row_iii');

            if (r1 && r2 && r3) {
                // Calculate FY
                const fyNumerator = parseFloat(r1.fy) || 0;
                const fyDenominator = parseFloat(r2.fy) || 0;
                r3.fy = fyDenominator > 0 ? ((fyNumerator / fyDenominator)).toFixed(2) : "0.00";

                // Calculate PY
                const pyNumerator = parseFloat(r1.py) || 0;
                const pyDenominator = parseFloat(r2.py) || 0;
                r3.py = pyDenominator > 0 ? ((pyNumerator / pyDenominator)).toFixed(2) : "0.00";
            }
            return JSON.stringify(rows);
        } catch (e) { return jsonString; }
    };

    updated.assurance_sub_type_for_number_of_days_of_accounts_payables =
        calculateQ8(updated.assurance_sub_type_for_number_of_days_of_accounts_payables);


    // --- SECTION C: PRINCIPLE 1 (Q9 - Openness) ---
    // Q9 is a large single table. We need to iterate and calculate various percentages.
    const calculateQ9 = (jsonString) => {
        try {
            if (!jsonString || jsonString === '[]') return jsonString;
            const rows = JSON.parse(jsonString);
            if (!Array.isArray(rows)) return jsonString;

            const calcPct = (numId, denId, resId) => {
                const rNum = rows.find(r => r.id === numId);
                const rDen = rows.find(r => r.id === denId);
                const rRes = rows.find(r => r.id === resId);
                if (rNum && rDen && rRes) {
                    // FY
                    const nFy = parseFloat(rNum.fy) || 0;
                    const dFy = parseFloat(rDen.fy) || 0;
                    rRes.fy = dFy > 0 ? ((nFy / dFy) * 100).toFixed(2) : "0.00";
                    // PY
                    const nPy = parseFloat(rNum.py) || 0;
                    const dPy = parseFloat(rDen.py) || 0;
                    rRes.py = dPy > 0 ? ((nPy / dPy) * 100).toFixed(2) : "0.00";
                }
            };

            // Concentration of Purchases
            calcPct('cp_a_i', 'cp_a_ii', 'cp_a_iii'); // % from trading houses
            calcPct('cp_c_i', 'cp_c_ii', 'cp_c_iii'); // % from top 10

            // Concentration of Sales
            calcPct('cs_a_i', 'cs_a_ii', 'cs_a_iii'); // % to dealers
            calcPct('cs_c_i', 'cs_c_ii', 'cs_c_iii'); // % to top 10

            // Share of RPTs
            calcPct('rpt_a_i', 'rpt_a_ii', 'rpt_a_iii'); // Purchases
            calcPct('rpt_b_i', 'rpt_b_ii', 'rpt_b_iii'); // Sales
            calcPct('rpt_c_i', 'rpt_c_ii', 'rpt_c_iii'); // Loans
            calcPct('rpt_d_i', 'rpt_d_ii', 'rpt_d_iii'); // Investments

            return JSON.stringify(rows);
        } catch (e) { return jsonString; }
    };

    updated.assurance_sub_type_for_details_of_concentration_of_purchases_and_sales_with_trading_houses_dealers_and_related_parties_along_with_loans_and_advances_and_investments_with_related_parties =
        calculateQ9(updated.assurance_sub_type_for_details_of_concentration_of_purchases_and_sales_with_trading_houses_dealers_and_related_parties_along_with_loans_and_advances_and_investments_with_related_parties);

    // --- SECTION C: PRINCIPLE 3 (Q1 - Well-being) ---
    const calculateP3Q1 = () => {
        const storageKey = 'details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it';
        let rows = [];
        try {
            const rawData = updated[storageKey]; // Fixed: use updated instead of report
            rows = rawData ? JSON.parse(rawData) : [];
        } catch (e) {
            rows = [];
        }

        if (!Array.isArray(rows) || rows.length === 0) return;

        // Map Section A keys to P3 Row IDs
        const map = {
            'perm_emp_male': 'number_of_male_permanent_employees',
            'perm_emp_female': 'number_of_female_permanent_employees',
            'perm_emp_other': 'number_of_other_permanent_employees',
            'perm_emp_total': 'total_number_of_permanent_employees',

            'other_emp_male': 'number_of_male_other_than_permanent_employees',
            'other_emp_female': 'number_of_female_other_than_permanent_employees',
            'other_emp_other': 'number_of_other_other_than_permanent_employees',
            'other_emp_total': 'total_number_of_other_than_permanent_employees',

            'perm_worker_male': 'number_of_male_permanent_workers',
            'perm_worker_female': 'number_of_female_permanent_workers',
            'perm_worker_other': 'number_of_other_permanent_workers',
            'perm_worker_total': 'total_number_of_permanent_workers',

            'other_worker_male': 'number_of_male_other_than_permanent_worker',
            'other_worker_female': 'number_of_female_other_than_permanent_worker',
            'other_worker_other': 'number_of_other_other_than_permanent_worker',
            'other_worker_total': 'total_number_of_other_than_permanent_worker'
        };

        const newRows = rows.map(row => {
            if (!row || row.isHeader) return row;

            const sourceKey = map[row.id];
            if (!sourceKey) return row;

            const totalA = val(sourceKey);
            const newRow = { ...row, total_a: totalA.toString() };

            const calc = (numKey, pctKey) => {
                const num = parseFloat(newRow[numKey]) || 0;
                if (totalA > 0) {
                    newRow[pctKey] = ((num / totalA) * 100).toFixed(2);
                } else {
                    newRow[pctKey] = '0.00';
                }
            };

            calc('health_no_b', 'health_pct_b');
            calc('accident_no_c', 'accident_pct_c');
            calc('maternity_no_d', 'maternity_pct_d');
            calc('paternity_no_e', 'paternity_pct_e');
            calc('daycare_no_f', 'daycare_pct_f');

            return newRow;
        });

        updated[storageKey] = JSON.stringify(newRows);
    };

    // --- SECTION C: PRINCIPLE 3 (Q1c - Well-being Spending) ---
    const calculateP3Q1c = () => {
        const cost = val('p3_e1c_cost_incurred_fy');
        const revenue = val('p3_e1c_total_revenue_fy');
        if (revenue > 0) {
            updated.p3_e1c_cost_as_pct_fy = ((cost / revenue) * 100).toFixed(2);
        } else {
            updated.p3_e1c_cost_as_pct_fy = "0.00";
        }

        const costPy = val('p3_e1c_cost_incurred_py');
        const revenuePy = val('p3_e1c_total_revenue_py');
        if (revenuePy > 0) {
            updated.p3_e1c_cost_as_pct_py = ((costPy / revenuePy) * 100).toFixed(2);
        } else {
            updated.p3_e1c_cost_as_pct_py = "0.00";
        }
    };

    // --- SECTION C: PRINCIPLE 3 (Q7 - Unions) ---
    const calculateP3Q7 = () => {
        const rowDefs = [
            { id: 'perm_emp_male', master: 'permanent_employees', gender: 'male' },
            { id: 'perm_emp_female', master: 'permanent_employees', gender: 'female' },
            { id: 'perm_emp_others', master: 'permanent_employees', gender: 'other' },
            { id: 'perm_worker_male', master: 'permanent_workers', gender: 'male' },
            { id: 'perm_worker_female', master: 'permanent_workers', gender: 'female' },
            { id: 'perm_worker_others', master: 'permanent_workers', gender: 'other' }
        ];

        rowDefs.forEach(r => {
            // FY Sync & Pct
            const masterTotal = val(`number_of_${r.gender}_${r.master}`);
            updated[`p3_e7_${r.id}_total_fy`] = masterTotal.toString();
            const unionNoFy = val(`p3_e7_${r.id}_union_fy`);
            updated[`p3_e7_${r.id}_pct_fy`] = masterTotal > 0 ? ((unionNoFy / masterTotal) * 100).toFixed(2) : "0.00";

            // PY Pct
            const totalPy = val(`p3_e7_${r.id}_total_py`);
            const unionNoPy = val(`p3_e7_${r.id}_union_py`);
            updated[`p3_e7_${r.id}_pct_py`] = totalPy > 0 ? ((unionNoPy / totalPy) * 100).toFixed(2) : "0.00";
        });

        // Totals
        ['perm_emp', 'perm_worker'].forEach(group => {
            const m_fy = val(`p3_e7_${group}_male_total_fy`);
            const f_fy = val(`p3_e7_${group}_female_total_fy`);
            const o_fy = val(`p3_e7_${group}_others_total_fy`);
            const total_fy = m_fy + f_fy + o_fy;
            updated[`p3_e7_${group}_total_total_fy`] = total_fy.toString();

            const m_u_fy = val(`p3_e7_${group}_male_union_fy`);
            const f_u_fy = val(`p3_e7_${group}_female_union_fy`);
            const o_u_fy = val(`p3_e7_${group}_others_union_fy`);
            const total_u_fy = m_u_fy + f_u_fy + o_u_fy;
            updated[`p3_e7_${group}_total_union_fy`] = total_u_fy.toString();
            updated[`p3_e7_${group}_total_pct_fy`] = total_fy > 0 ? ((total_u_fy / total_fy) * 100).toFixed(2) : "0.00";

            // PY Totals
            const m_py = val(`p3_e7_${group}_male_total_py`);
            const f_py = val(`p3_e7_${group}_female_total_py`);
            const o_py = val(`p3_e7_${group}_others_total_py`);
            const total_py = m_py + f_py + o_py;
            updated[`p3_e7_${group}_total_total_py`] = total_py.toString();

            const m_u_py = val(`p3_e7_${group}_male_union_py`);
            const f_u_py = val(`p3_e7_${group}_female_union_py`);
            const o_u_py = val(`p3_e7_${group}_others_union_py`);
            const total_u_py = m_u_py + f_u_py + o_u_py;
            updated[`p3_e7_${group}_total_union_py`] = total_u_py.toString();
            updated[`p3_e7_${group}_total_pct_py`] = total_py > 0 ? ((total_u_py / total_py) * 100).toFixed(2) : "0.00";
        });
    };

    // --- SECTION C: PRINCIPLE 3 (Q8 - Training) ---
    const calculateP3Q8 = () => {
        const groups = [
            { id: 'emp', master: 'employees' },
            { id: 'worker', master: 'workers' }
        ];
        const genders = ['male', 'female', 'others'];

        groups.forEach(g => {
            genders.forEach(gen => {
                const masterKey = gen === 'others' ? `number_of_other_${g.master}` : `number_of_${gen}_${g.master}`;
                const totalA = val(masterKey);
                updated[`p3_e8_${g.id}_${gen}_total_fy`] = totalA.toString();

                const hsNoFy = val(`p3_e8_${g.id}_${gen}_hs_no_fy`);
                const skillNoFy = val(`p3_e8_${g.id}_${gen}_skill_no_fy`);
                updated[`p3_e8_${g.id}_${gen}_hs_pct_fy`] = totalA > 0 ? ((hsNoFy / totalA) * 100).toFixed(2) : "0.00";
                updated[`p3_e8_${g.id}_${gen}_skill_pct_fy`] = totalA > 0 ? ((skillNoFy / totalA) * 100).toFixed(2) : "0.00";

                const totalD = val(`p3_e8_${g.id}_${gen}_total_py`);
                const hsNoPy = val(`p3_e8_${g.id}_${gen}_hs_no_py`);
                const skillNoPy = val(`p3_e8_${g.id}_${gen}_skill_no_py`);
                updated[`p3_e8_${g.id}_${gen}_hs_pct_py`] = totalD > 0 ? ((hsNoPy / totalD) * 100).toFixed(2) : "0.00";
                updated[`p3_e8_${g.id}_${gen}_skill_pct_py`] = totalD > 0 ? ((skillNoPy / totalD) * 100).toFixed(2) : "0.00";
            });

            // Totals
            const totalA_all_fy = val(`p3_e8_${g.id}_male_total_fy`) + val(`p3_e8_${g.id}_female_total_fy`) + val(`p3_e8_${g.id}_others_total_fy`);
            updated[`p3_e8_${g.id}_total_total_fy`] = totalA_all_fy.toString();

            const hsNoFy_all = val(`p3_e8_${g.id}_male_hs_no_fy`) + val(`p3_e8_${g.id}_female_hs_no_fy`) + val(`p3_e8_${g.id}_others_hs_no_fy`);
            const skillNoFy_all = val(`p3_e8_${g.id}_male_skill_no_fy`) + val(`p3_e8_${g.id}_female_skill_no_fy`) + val(`p3_e8_${g.id}_others_skill_no_fy`);
            updated[`p3_e8_${g.id}_total_hs_no_fy`] = hsNoFy_all.toString();
            updated[`p3_e8_${g.id}_total_skill_no_fy`] = skillNoFy_all.toString();
            updated[`p3_e8_${g.id}_total_hs_pct_fy`] = totalA_all_fy > 0 ? ((hsNoFy_all / totalA_all_fy) * 100).toFixed(2) : "0.00";
            updated[`p3_e8_${g.id}_total_skill_pct_fy`] = totalA_all_fy > 0 ? ((skillNoFy_all / totalA_all_fy) * 100).toFixed(2) : "0.00";

            const totalD_all_py = val(`p3_e8_${g.id}_male_total_py`) + val(`p3_e8_${g.id}_female_total_py`) + val(`p3_e8_${g.id}_others_total_py`);
            updated[`p3_e8_${g.id}_total_total_py`] = totalD_all_py.toString();
            const hsNoPy_all = val(`p3_e8_${g.id}_male_hs_no_py`) + val(`p3_e8_${g.id}_female_hs_no_py`) + val(`p3_e8_${g.id}_others_hs_no_py`);
            const skillNoPy_all = val(`p3_e8_${g.id}_male_skill_no_py`) + val(`p3_e8_${g.id}_female_skill_no_py`) + val(`p3_e8_${g.id}_others_skill_no_py`);
            updated[`p3_e8_${g.id}_total_hs_no_py`] = hsNoPy_all.toString();
            updated[`p3_e8_${g.id}_total_skill_no_py`] = skillNoPy_all.toString();
            updated[`p3_e8_${g.id}_total_hs_pct_py`] = totalD_all_py > 0 ? ((hsNoPy_all / totalD_all_py) * 100).toFixed(2) : "0.00";
            updated[`p3_e8_${g.id}_total_skill_pct_py`] = totalD_all_py > 0 ? ((skillNoPy_all / totalD_all_py) * 100).toFixed(2) : "0.00";
        });
    };

    // --- SECTION C: PRINCIPLE 3 (Q9 - Performance Reviews) ---
    const calculateP3Q9 = () => {
        const groups = [
            { id: 'emp', master: 'employees' },
            { id: 'worker', master: 'workers' }
        ];
        const genders = ['male', 'female', 'others'];

        groups.forEach(g => {
            genders.forEach(gen => {
                const masterKey = gen === 'others' ? `number_of_other_${g.master}` : `number_of_${gen}_${g.master}`;
                const totalA = val(masterKey);
                updated[`p3_e9_${g.id}_${gen}_total_fy`] = totalA.toString();

                const noFy = val(`p3_e9_${g.id}_${gen}_no_fy`);
                updated[`p3_e9_${g.id}_${gen}_pct_fy`] = totalA > 0 ? ((noFy / totalA) * 100).toFixed(2) : "0.00";

                const totalD = val(`p3_e9_${g.id}_${gen}_total_py`);
                const noPy = val(`p3_e9_${g.id}_${gen}_no_py`);
                updated[`p3_e9_${g.id}_${gen}_pct_py`] = totalD > 0 ? ((noPy / totalD) * 100).toFixed(2) : "0.00";
            });

            // Totals
            const totalA_all_fy = val(`p3_e9_${g.id}_male_total_fy`) + val(`p3_e9_${g.id}_female_total_fy`) + val(`p3_e9_${g.id}_others_total_fy`);
            updated[`p3_e9_${g.id}_total_total_fy`] = totalA_all_fy.toString();

            const noFy_all = val(`p3_e9_${g.id}_male_no_fy`) + val(`p3_e9_${g.id}_female_no_fy`) + val(`p3_e9_${g.id}_others_no_fy`);
            updated[`p3_e9_${g.id}_total_no_fy`] = noFy_all.toString();
            updated[`p3_e9_${g.id}_total_pct_fy`] = totalA_all_fy > 0 ? ((noFy_all / totalA_all_fy) * 100).toFixed(2) : "0.00";

            const totalD_all_py = val(`p3_e9_${g.id}_male_total_py`) + val(`p3_e9_${g.id}_female_total_py`) + val(`p3_e9_${g.id}_others_total_py`);
            updated[`p3_e9_${g.id}_total_total_py`] = totalD_all_py.toString();
            const noPy_all = val(`p3_e9_${g.id}_male_no_py`) + val(`p3_e9_${g.id}_female_no_py`) + val(`p3_e9_${g.id}_others_no_py`);
            updated[`p3_e9_${g.id}_total_no_py`] = noPy_all.toString();
            updated[`p3_e9_${g.id}_total_pct_py`] = totalD_all_py > 0 ? ((noPy_all / totalD_all_py) * 100).toFixed(2) : "0.00";
        });
    };

    // --- SECTION C: PRINCIPLE 6 (Q1 - Energy) ---
    const calculateP6Q1 = () => {
        ['fy', 'py'].forEach(p => {
            const a = val(`p6_e1_renew_elec_${p}`);
            const b = val(`p6_e1_renew_fuel_${p}`);
            const c = val(`p6_e1_renew_other_${p}`);
            const totalRenewable = a + b + c;
            updated[`p6_e1_total_renew_${p}`] = totalRenewable.toString();

            const d = val(`p6_e1_non_renew_elec_${p}`);
            const e = val(`p6_e1_non_renew_fuel_${p}`);
            const f = val(`p6_e1_non_renew_other_${p}`);
            const totalNonRenewable = d + e + f;
            updated[`p6_e1_total_non_renew_${p}`] = totalNonRenewable.toString();

            const grandTotal = totalRenewable + totalNonRenewable;
            updated[`p6_e1_grand_total_${p}`] = grandTotal.toString();

            const revenue = val(`p6_e1_revenue_${p}`);
            if (revenue > 0) {
                updated[`p6_e1_intensity_turnover_${p}`] = (grandTotal / revenue).toFixed(10);
            } else {
                updated[`p6_e1_intensity_turnover_${p}`] = "0";
            }
        });

        // Unit Syncing Logic
        const masterUnit = updated.p6_e1_unit_master || report.p6_e1_unit_master || "Terajoule (TJ)";
        const intensityUnit = `${masterUnit} / Rs.`;

        [
            'p6_e1_renew_fuel_units', 'p6_e1_renew_other_units', 'p6_e1_total_renew_units',
            'p6_e1_non_renew_elec_units', 'p6_e1_non_renew_fuel_units', 'p6_e1_non_renew_other_units',
            'p6_e1_total_non_renew_units', 'p6_e1_grand_total_units',
            'p6_e1_intensity_ppp_units', 'p6_e1_intensity_physical_units', 'p6_e1_intensity_optional_units'
        ].forEach(field => updated[field] = masterUnit);

        updated.p6_e1_intensity_turnover_units = intensityUnit;
    };

    // --- SECTION C: PRINCIPLE 6 (Q3 - Water) ---
    const calculateP6Q3 = () => {
        ['fy', 'py'].forEach(p => {
            const surface = val(`p6_e3_surface_${p}`);
            const ground = val(`p6_e3_ground_${p}`);
            const third = val(`p6_e3_third_party_${p}`);
            const sea = val(`p6_e3_seawater_${p}`);
            const others = val(`p6_e3_others_${p}`);
            const totalWidthdrawal = surface + ground + third + sea + others;
            updated[`p6_e3_total_withdrawal_${p}`] = totalWidthdrawal.toFixed(2);

            const totalConsumption = val(`p6_e3_total_consumption_${p}`);
            const revenue = val(`p6_e3_revenue_${p}`);
            const revenuePPP = val(`p6_e3_revenue_ppp_${p}`);

            if (revenue > 0) {
                updated[`p6_e3_intensity_turnover_${p}`] = (totalConsumption / revenue).toFixed(6);
            }
            if (revenuePPP > 0) {
                updated[`p6_e3_intensity_ppp_${p}`] = (totalConsumption / revenuePPP).toFixed(6);
            }
        });
    };

    // --- SECTION C: PRINCIPLE 6 (Q4 - Water Discharge) ---
    const calculateP6Q4 = () => {
        ['fy', 'py'].forEach(p => {
            const surface_none = val(`p6_e4_surface_none_${p}`);
            const surface_treat = val(`p6_e4_surface_treat_${p}`);
            const ground_none = val(`p6_e4_ground_none_${p}`);
            const ground_treat = val(`p6_e4_ground_treat_${p}`);
            const sea_none = val(`p6_e4_sea_none_${p}`);
            const sea_treat = val(`p6_e4_sea_treat_${p}`);
            const third_none = val(`p6_e4_third_none_${p}`);
            const third_treat = val(`p6_e4_third_treat_${p}`);
            const others_none = val(`p6_e4_others_none_${p}`);
            const others_treat = val(`p6_e4_others_treat_${p}`);

            const totalDischarge = surface_none + surface_treat + ground_none + ground_treat +
                sea_none + sea_treat + third_none + third_treat +
                others_none + others_treat;
            updated[`p6_e4_total_discharge_${p}`] = totalDischarge.toFixed(2);
        });
    };

    // --- SECTION C: PRINCIPLE 6 (Q7 - GHG) ---
    const calculateP6Q7 = () => {
        // Unit Syncing - Always use tCO2e as the standard unit for uniformity
        const masterUnit = "tCO2e";  // Fixed to tCO2e for consistent reporting across all companies
        updated.p6_e7_scope1_unit = masterUnit;
        updated.p6_e7_scope2_unit = masterUnit;
        updated.p6_e7_intensity_turnover_unit = `${masterUnit} / Rs.`;
        updated.p6_e7_intensity_ppp_unit = `${masterUnit} / Rs.`;
        updated.p6_e7_intensity_physical_unit = masterUnit;
        updated.p6_e7_intensity_optional_unit = masterUnit;

        ['fy', 'py'].forEach(p => {
            const s1 = val(`p6_e7_scope1_${p}`);
            const s2 = val(`p6_e7_scope2_${p}`);
            const totalEmissions = s1 + s2;

            const revenue = val(`p6_e3_revenue_${p}`);
            const revenuePPP = val(`p6_e3_revenue_ppp_${p}`);

            if (revenue > 0) {
                updated[`p6_e7_intensity_turnover_${p}`] = (totalEmissions / revenue).toFixed(6);
            }
            if (revenuePPP > 0) {
                updated[`p6_e7_intensity_ppp_${p}`] = (totalEmissions / revenuePPP).toFixed(6);
            }
        });
    };

    // --- SECTION C: PRINCIPLE 6 (Q9 - Waste Management) ---
    const calculateP6Q9 = () => {
        ['fy', 'py'].forEach(p => {
            // 1. Generation Total
            const plastic = val(`p6_e9_plastic_${p}`);
            const ewaste = val(`p6_e9_ewaste_${p}`);
            const biomed = val(`p6_e9_biomed_${p}`);
            const construction = val(`p6_e9_construction_${p}`);
            const battery = val(`p6_e9_battery_${p}`);
            const radioactive = val(`p6_e9_radioactive_${p}`);
            const hazOther = val(`p6_e9_haz_other_${p}`);
            const nonHazOther = val(`p6_e9_nonhaz_other_${p}`);

            const totalGeneration = plastic + ewaste + biomed + construction + battery + radioactive + hazOther + nonHazOther;
            updated[`p6_e9_total_generation_${p}`] = totalGeneration.toFixed(2);

            // 2. Intensity
            const revenue = val(`p6_e3_revenue_${p}`);
            const revenuePPP = val(`p6_e3_revenue_ppp_${p}`);

            if (revenue > 0) {
                updated[`p6_e9_intensity_turnover_${p}`] = (totalGeneration / revenue).toFixed(6);
            }
            if (revenuePPP > 0) {
                updated[`p6_e9_intensity_ppp_${p}`] = (totalGeneration / revenuePPP).toFixed(6);
            }

            // 3. Recovery Total
            const recycled = val(`p6_e9_recycled_${p}`);
            const reused = val(`p6_e9_reused_${p}`);
            const otherRecovery = val(`p6_e9_other_recovery_${p}`);
            updated[`p6_e9_total_recovered_${p}`] = (recycled + reused + otherRecovery).toFixed(2);

            // 4. Disposal Total
            const incineration = val(`p6_e9_incineration_${p}`);
            const landfilling = val(`p6_e9_landfilling_${p}`);
            const otherDisposal = val(`p6_e9_other_disposal_${p}`);
            updated[`p6_e9_total_disposed_${p}`] = (incineration + landfilling + otherDisposal).toFixed(2);
        });
    };

    // --- SECTION C: PRINCIPLE 6 LEADERSHIP (Q2 - Scope 3) ---
    const calculateP6L2 = () => {
        const isApplicable = report.p6_l2_is_applicable === 'Yes';

        if (!isApplicable) {
            ['fy', 'py'].forEach(p => {
                updated[`p6_l2_scope3_${p}`] = '';
                updated[`p6_l2_turnover_${p}`] = '';
                updated[`p6_l2_optional_${p}`] = '';
            });
            updated.p6_l2_scope3_unit = '';
            updated.p6_l2_turnover_unit = '';
            updated.p6_l2_optional_unit = '';
            return;
        }

        ['fy', 'py'].forEach(p => {
            const scope3 = val(`p6_l2_scope3_${p}`);
            const revenue = val(`p6_e3_revenue_${p}`);

            if (revenue > 0) {
                updated[`p6_l2_turnover_${p}`] = (scope3 / revenue).toFixed(6);
            }
        });

        // Sync Units - Always use tCO2e for uniformity across all companies
        const selectedUnit = "tCO2e";  // Fixed to tCO2e for consistent reporting
        updated.p6_l2_scope3_unit = selectedUnit;
        updated.p6_l2_turnover_unit = `${selectedUnit} / Rs.`;
    };

    // --- SECTION C: PRINCIPLE 5 (Q1 - Training) ---
    const calculateP5Q1 = () => {
        const rows = ['perm_emp', 'other_emp', 'total_emp', 'perm_worker', 'other_worker', 'total_worker'];
        const map = {
            'perm_emp': 'total_number_of_permanent_employees',
            'other_emp': 'total_number_of_other_than_permanent_employees',
            'perm_worker': 'total_number_of_permanent_workers',
            'other_worker': 'total_number_of_other_than_permanent_worker'
        };

        // 1. Sync Base FY Totals from Section IV
        rows.forEach(rowId => {
            if (map[rowId]) {
                updated[`p5_e1_${rowId}_total_fy`] = val(map[rowId]).toString();
            }
        });

        // 2. Sum categories into "Total Employees" and "Total Workers"
        const sumCategories = (totalId, subIds) => {
            ['total_fy', 'on_hr_fy', 'total_py', 'on_hr_py'].forEach(col => {
                let sum = 0;
                subIds.forEach(sId => sum += val(`p5_e1_${sId}_${col}`));
                updated[`p5_e1_${totalId}_${col}`] = sum.toString();
            });
        };
        sumCategories('total_emp', ['perm_emp', 'other_emp']);
        sumCategories('total_worker', ['perm_worker', 'other_worker']);

        // 3. Recalculate all percentages
        rows.forEach(rowId => {
            setPct(`p5_e1_${rowId}_percent_fy`, val(`p5_e1_${rowId}_on_hr_fy`), val(`p5_e1_${rowId}_total_fy`));
            setPct(`p5_e1_${rowId}_percent_py`, val(`p5_e1_${rowId}_on_hr_py`), val(`p5_e1_${rowId}_total_py`));
        });
    };

    // --- SECTION C: PRINCIPLE 5 (Q2 - Minimum Wages) ---
    const calculateP5Q2 = () => {
        const categories = ['perm_emp', 'other_emp', 'perm_worker', 'other_worker'];
        const genders = ['male', 'female', 'other'];
        const map = {
            'perm_emp_male': 'number_of_male_permanent_employees',
            'perm_emp_female': 'number_of_female_permanent_employees',
            'perm_emp_other': 'number_of_other_permanent_employees',
            'perm_emp': 'total_number_of_permanent_employees',
            'other_emp_male': 'number_of_male_other_than_permanent_employees',
            'other_emp_female': 'number_of_female_other_than_permanent_employees',
            'other_emp_other': 'number_of_other_other_than_permanent_employees',
            'other_emp': 'total_number_of_other_than_permanent_employees',
            'perm_worker_male': 'number_of_male_permanent_workers',
            'perm_worker_female': 'number_of_female_permanent_workers',
            'perm_worker_other': 'number_of_other_permanent_workers',
            'perm_worker': 'total_number_of_permanent_workers',
            'other_worker_male': 'number_of_male_other_than_permanent_worker',
            'other_worker_female': 'number_of_female_other_than_permanent_worker',
            'other_worker_other': 'number_of_other_other_than_permanent_worker',
            'other_worker': 'total_number_of_other_than_permanent_worker'
        };

        // 1. Sync FY Totals from Section IV
        Object.keys(map).forEach(rowId => {
            updated[`p5_e2_${rowId}_total_fy`] = val(map[rowId]).toString();
        });

        // 2. Sum genders into category rows
        categories.forEach(cat => {
            ['total_fy', 'equal_fy', 'more_fy', 'total_py', 'equal_py', 'more_py'].forEach(col => {
                let sum = 0;
                // Special case: total_fy is already synced for categories in map, but we could also recalc from genders
                genders.forEach(gen => sum += val(`p5_e2_${cat}_${gen}_${col}`));
                // Only overwrite if it's NOT total_fy (since total_fy is synced directly from master)
                // Actually, syncing from genders is safer if user enters data there.
                updated[`p5_e2_${cat}_${col}`] = sum.toString();
            });
        });

        // 3. Recalculate all percentages for all possible rows
        const allRows = [...categories];
        categories.forEach(cat => genders.forEach(gen => allRows.push(`${cat}_${gen}`)));

        allRows.forEach(rowId => {
            setPct(`p5_e2_${rowId}_equal_pct_fy`, val(`p5_e2_${rowId}_equal_fy`), val(`p5_e2_${rowId}_total_fy`));
            setPct(`p5_e2_${rowId}_more_pct_fy`, val(`p5_e2_${rowId}_more_fy`), val(`p5_e2_${rowId}_total_fy`));
            setPct(`p5_e2_${rowId}_equal_pct_py`, val(`p5_e2_${rowId}_equal_py`), val(`p5_e2_${rowId}_total_py`));
            setPct(`p5_e2_${rowId}_more_pct_py`, val(`p5_e2_${rowId}_more_py`), val(`p5_e2_${rowId}_total_py`));
        });
    };

    // --- SECTION C: PRINCIPLE 5 (Q3 - Remuneration) ---
    const calculateP5Q3 = () => {
        // 1. Sync Numbers for Q3a (Median Remuneration)
        // BoD Number sync from Q22
        updated.p5_e3a_bod_male_no = val('number_of_male_board_of_directors').toString();
        updated.p5_e3a_bod_female_no = val('number_of_female_board_of_directors').toString();
        updated.p5_e3a_bod_other_no = val('number_of_other_board_of_directors').toString();

        // KMP Number sync from Q22
        updated.p5_e3a_kmp_male_no = val('number_of_male_key_management_personnel').toString();
        updated.p5_e3a_kmp_female_no = val('number_of_female_key_management_personnel').toString();
        updated.p5_e3a_kmp_other_no = val('number_of_other_key_management_personnel').toString();

        // Workers Number sync from IV-A
        updated.p5_e3a_workers_male_no = val('number_of_male_workers').toString();
        updated.p5_e3a_workers_female_no = val('number_of_female_workers').toString();
        updated.p5_e3a_workers_other_no = val('number_of_other_workers').toString();

        // 2. Calculate Q3b (Gross Wages %)
        ['fy', 'py'].forEach(p => {
            const gross = val(`p5_e3b_gross_female_${p}`);
            const total = val(`p5_e3b_total_wages_${p}`);
            if (total > 0) {
                updated[`p5_e3b_percent_${p}`] = ((gross / total) * 100).toFixed(2);
            } else {
                updated[`p5_e3b_percent_${p}`] = "0.00";
            }
        });
    };

    const calculateP5Q7 = () => {
        ['fy', 'py'].forEach(p => {
            const total = val(`p5_e7_total_posh_${p}`);
            const femaleCount = val(`p5_e7_female_count_${p}`);
            if (femaleCount > 0) {
                updated[`p5_e7_percent_${p}`] = ((total / femaleCount) * 100).toFixed(2);
            } else {
                updated[`p5_e7_percent_${p}`] = "0.00";
            }
        });
    };

    // Execute Calculations
    calculateDemographics("permanent_employees");
    calculateDemographics("other_than_permanent_employees");
    calculateDemographics("permanent_workers");
    calculateDemographics("other_than_permanent_worker");

    calculateP3Q1();
    calculateP3Q1c();
    calculateP3Q7();
    calculateP3Q8();
    calculateP3Q9();
    calculateP5Q1();
    calculateP5Q2();
    calculateP5Q3();
    calculateP5Q7();
    calculateP6Q1();
    calculateP6Q3();
    calculateP6Q4();
    calculateP6Q7();
    calculateP6Q9();
    calculateP6L2();

    return updated;
};
