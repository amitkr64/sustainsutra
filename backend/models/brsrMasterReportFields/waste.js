// Field group: waste*
// Auto-extracted from brsrMasterReportModel — do not edit by hand;
// run scripts/split_master_model.cjs to regenerate. mongoose type
// references are preserved as mongoose.Schema.Types.* identifiers.
const mongoose = require('mongoose');
module.exports = {
  waste_disposed_by_incineration: {
    type: String,
  },
  waste_disposed_by_landfilling: {
    type: String,
  },
  waste_disposed_by_other_disposal_operations: {
    type: String,
  },
  waste_intensity_in_term_of_physical_output: {
    type: String,
  },
  waste_intensity_per_rupee_of_turnover: {
    type: String,
  },
  waste_intensity_per_rupee_of_turnover_adjusting_for_purchasing_power_parity: {
    type: String,
  },
  waste_intensity_the_relevant_metric_may_be_selected_by_the_entity: {
    type: String,
  },
  waste_intensity_the_relevant_metric_may_be_selected_by_the_entity_per_area: {
    type: String,
  },
  waste_recovered_through_other_recovery_operations: {
    type: String,
  },
  waste_recovered_through_re_used: {
    type: String,
  },
  waste_recovered_through_recycled: {
    type: String,
  },
};
