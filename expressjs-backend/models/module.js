const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ModuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  task_list: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  user_list: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {collection : 'modules_list'});

const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;