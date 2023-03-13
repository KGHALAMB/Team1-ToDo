const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtask' }]
  },
  { collection: 'tasks' }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
