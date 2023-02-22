const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: false,
    trim: true,
    timestamps: true,
  },
  priority: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
}, {collection : 'tasks_list'});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;