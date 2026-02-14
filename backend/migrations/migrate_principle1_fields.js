/**
 * BRSR Principle 1 Data Migration Script
 * 
 * Migrates data from old field structures to new XBRL-aligned fields for:
 * - Q4: Anti-corruption policy
 * - Q5: Disciplinary actions
 * - Q6: Conflict of interest
 * - Q8: Accounts payable
 * 
 * Run this script ONCE before deploying the new field structure
 */

const mongoose = require('mongoose');
const BRSRReport = require('../models/BRSRReport'); // Adjust path as needed

// Database connection (adjust as per your setup)
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sustainsutra';

async function migratePrinciple1Data() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to database');

        const reports = await BRSRReport.find({});
        console.log(`Found ${reports.length} reports to migrate`);

        let migratedCount = 0;
        let errorCount = 0;

        for (const report of reports) {
            try {
                let updated = false;

                // Q4: Anti-Corruption Policy Migration
                if (report.whether_details_and_weblink_of_an_anti_corruption_or_anti_bribery_policy_is_place) {
                    // Migrate the Yes/No/NA value
                    report.does_the_entity_have_an_anti_corruption_or_anti_bribery_policy =
                        report.whether_details_and_weblink_of_an_anti_corruption_or_anti_bribery_policy_is_place;

                    // If there was a combined details/weblink field, try to parse it
                    if (report.details_and_weblink_of_an_anti_corruption_or_anti_bribery_policy_is_place) {
                        const oldValue = report.details_and_weblink_of_an_anti_corruption_or_anti_bribery_policy_is_place;

                        // Try to detect if it's a URL
                        if (oldValue.startsWith('http://') || oldValue.startsWith('https://')) {
                            report.web_link_at_anti_corruption_or_anti_bribery_policy_is_place = oldValue;
                        } else {
                            // If it contains URL patterns, try to split
                            const urlMatch = oldValue.match(/(https?:\/\/[^\s]+)/);
                            if (urlMatch) {
                                report.web_link_at_anti_corruption_or_anti_bribery_policy_is_place = urlMatch[1];
                                report.anti_corruption_or_anti_bribery_policy_explanatory_text_block =
                                    oldValue.replace(urlMatch[1], '').trim();
                            } else {
                                // No URL detected, put everything in details
                                report.anti_corruption_or_anti_bribery_policy_explanatory_text_block = oldValue;
                            }
                        }
                    }
                    updated = true;
                }

                // Q5: Disciplinary Actions Migration (from table to individual fields)
                if (report.assurance_sub_type_for_number_of_directors_or_km_ps_or_employees_or_workers_against_whom_disciplinary_action_was_taken_by_any_law_enforcement_agency_for_the_charges_of_bribery_or_corruption) {
                    try {
                        const tableData = JSON.parse(
                            report.assurance_sub_type_for_number_of_directors_or_km_ps_or_employees_or_workers_against_whom_disciplinary_action_was_taken_by_any_law_enforcement_agency_for_the_charges_of_bribery_or_corruption
                        );

                        if (Array.isArray(tableData)) {
                            const directorsRow = tableData.find(r => r.category === 'Directors');
                            const kmpsRow = tableData.find(r => r.category === 'KMPs');
                            const employeesRow = tableData.find(r => r.category === 'Employees');
                            const workersRow = tableData.find(r => r.category === 'Workers');

                            if (directorsRow) report.number_of_directors_against_whom_disciplinary_action_was_taken = directorsRow.fy_days;
                            if (kmpsRow) report.number_of_km_ps_against_whom_disciplinary_action_was_taken = kmpsRow.fy_days;
                            if (employeesRow) report.number_of_employees_against_whom_disciplinary_action_was_taken = employeesRow.fy_days;
                            if (workersRow) report.number_of_workers_against_whom_disciplinary_action_was_taken = workersRow.fy_days;

                            updated = true;
                        }
                    } catch (e) {
                        console.error(`Error parsing Q5 data for report ${report._id}:`, e.message);
                    }
                }

                // Q6: Conflict of Interest Migration (from table to individual fields)
                if (report.assurance_sub_type_for_details_of_complaints_with_regard_to_conflict_of_interest) {
                    try {
                        const tableData = JSON.parse(
                            report.assurance_sub_type_for_details_of_complaints_with_regard_to_conflict_of_interest
                        );

                        if (Array.isArray(tableData)) {
                            const directorsRow = tableData.find(r =>
                                r.category.includes('Directors')
                            );
                            const kmpsRow = tableData.find(r =>
                                r.category.includes('KMPs')
                            );

                            if (directorsRow) {
                                report.number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors = directorsRow.num_fy;
                                report.remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors = directorsRow.remarks_fy;
                            }
                            if (kmpsRow) {
                                report.number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_km_ps = kmpsRow.num_fy;
                                report.remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_kmps = kmpsRow.remarks_fy;
                            }

                            updated = true;
                        }
                    } catch (e) {
                        console.error(`Error parsing Q6 data for report ${report._id}:`, e.message);
                    }
                }

                // Q8: Accounts Payable Migration (from table to individual fields)
                if (report.assurance_sub_type_for_number_of_days_of_accounts_payables) {
                    try {
                        const tableData = JSON.parse(
                            report.assurance_sub_type_for_number_of_days_of_accounts_payables
                        );

                        if (Array.isArray(tableData)) {
                            const row1 = tableData.find(r => r.id === 'row_i' || r.metric?.includes('Accounts Payable'));
                            const row2 = tableData.find(r => r.id === 'row_ii' || r.metric?.includes('Cost of goods'));
                            const row3 = tableData.find(r => r.id === 'row_iii' || r.metric?.includes('Number of days'));

                            if (row1) report.amount_of_accounts_payable_during_the_year = row1.fy;
                            if (row2) report.cost_of_goods_or_services_procured_during_the_year = row2.fy;
                            if (row3) report.number_of_days_of_accounts_payable = row3.fy;

                            updated = true;
                        }
                    } catch (e) {
                        console.error(`Error parsing Q8 data for report ${report._id}:`, e.message);
                    }
                }

                // Save if any updates were made
                if (updated) {
                    await report.save();
                    migratedCount++;
                    console.log(`✓ Migrated report ${report._id}`);
                }

            } catch (error) {
                errorCount++;
                console.error(`✗ Error migrating report ${report._id}:`, error.message);
            }
        }

        console.log('\n=== Migration Complete ===');
        console.log(`Total reports processed: ${reports.length}`);
        console.log(`Successfully migrated: ${migratedCount}`);
        console.log(`Errors: ${errorCount}`);

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run migration
if (require.main === module) {
    migratePrinciple1Data()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { migratePrinciple1Data };
