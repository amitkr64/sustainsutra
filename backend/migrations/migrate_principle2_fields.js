/**
 * BRSR Principle 2 Data Migration Script
 * 
 * Migrates data from old field names to new XBRL-aligned fields for:
 * - E4: EPR (2 fields)
 * - L1: LCA NA details (1 field)
 * 
 * Run this script ONCE before deploying the new field structure
 */

const mongoose = require('mongoose');
const BRSRReport = require('../models/BRSRReport'); // Adjust path as needed

// Database connection (adjust as per your setup)
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sustainsutra';

async function migratePrinciple2Data() {
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

                // E4: EPR - Waste collection plan field
                if (report.whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards_and_steps_taken_to_address_the_waste_collection_plan_if_not_submitted) {
                    // Migrate the Yes/No value to new shorter field name
                    report.whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards =
                        report.whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards_and_steps_taken_to_address_the_waste_collection_plan_if_not_submitted;

                    updated = true;
                }

                // E4: Steps taken field
                if (report.steps_taken_to_address_the_waste_collection_plan_if_not_submitted_text_block) {
                    // Rename to new field with _explanatory_text_block suffix
                    report.steps_taken_to_address_the_waste_collection_plan_explanatory_text_block =
                        report.steps_taken_to_address_the_waste_collection_plan_if_not_submitted_text_block;

                    updated = true;
                }

                // L1: LCA NA details field
                if (report.details_for_not_conducting_lca_explanatory_text_block) {
                    // Migrate to the longer, more specific XBRL-aligned name
                    report.the_entity_has_not_applicable_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services_explanatory_text_block =
                        report.details_for_not_conducting_lca_explanatory_text_block;

                    updated = true;
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

        // Optional: Clean up old fields
        if (migratedCount > 0) {
            console.log('\nNote: Old field data has been migrated. You may want to remove old fields from the database after verification.');
            console.log('Old fields:');
            console.log('  - whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards_and_steps_taken_to_address_the_waste_collection_plan_if_not_submitted');
            console.log('  - steps_taken_to_address_the_waste_collection_plan_if_not_submitted_text_block');
            console.log('  - details_for_not_conducting_lca_explanatory_text_block');
        }

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run migration
if (require.main === module) {
    migratePrinciple2Data()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { migratePrinciple2Data };
