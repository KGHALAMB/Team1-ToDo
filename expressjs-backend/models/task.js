const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      required: true,
      trim: true,
      timestamps: true
    },
    priority: {
      type: String,
      required: true,
      trim: true
    }
  },
  { collection: 'tasks_list' }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
