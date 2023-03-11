const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    admin_list: [{ type: Schema.Types.ObjectId, ref: "User" }],
    member_list: [{ type: Schema.Types.ObjectId, ref: "User" }],
    module_list: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  },
  { collection: "groups_list" }
);

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
