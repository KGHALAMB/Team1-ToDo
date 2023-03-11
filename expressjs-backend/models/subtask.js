const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema(
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
    date: {
      type: String,
      required: true,
      trim: true,
      timestamps: true
    },
    priority: {
      type: Number,
      required: true,
      trim: true
    },
    steps: [{ type: String, required: false, trim: true }]
  },
  { collection: 'subtask_list' }
);

const Subtask = mongoose.model('Subtask', SubtaskSchema);

module.exports = Subtask;
