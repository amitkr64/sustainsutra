// Field group: status*
// Auto-extracted from brsrMasterReportModel — do not edit by hand;
// run scripts/split_master_model.cjs to regenerate. mongoose type
// references are preserved as mongoose.Schema.Types.* identifiers.
const mongoose = require('mongoose');
module.exports = {
  status: {
    type: String,
    enum: [
      "draft",
      "submitted",
      "approved"
      ],
    default: "draft",
  },
};
