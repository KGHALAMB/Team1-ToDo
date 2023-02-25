const connectMongooseDB = require("./mongoose.db.config");
const userModel = require("./task");

async function getTasks(title, description, category, duration, priority) {
  let result;
  if (title === undefined && description === undefined
    && category === undefined && duration == undefined
    && priority == undefined) {
    result = await taskModel.find();
  } else if (description && !title && !category && !duration && !priority) {
    result = await findTaskByDescription(description);
  } else if (category && !title && !description && !duration && !priority) {
    result = await findTaskByCategory(category);
  } else if (duration && !title && !description && !category && !priority) {
    result = await findTaskByDuration(duration);
  } else if (priority && !title && !description && !category && !duration) {
    result = await findTaskByPriority(priority);
  } else {
    result = await findTaskByTitle(title);
  }
  return result;
}

async function findTaskById(id) {
  try {
    return await taskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addTask(task) {
  try {
    const taskToAdd = new taskModel(task);
    const savedTask = await taskToAdd.save();
    return savedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findTaskByTitle(title) {
  return await userModel.find({ title: title });
}

async function findTaskByDescription(description) {
  return await userModel.find({ description: description });
}

async function findTaskByCategory(category) {
    return await userModel.find({ category: category });
}

async function findTaskByDuration(duration) {
    return await userModel.find({ duration: duration });
}

async function findTaskByPriority(priority) {
    return await userModel.find({ priority: priority });
}

exports.getTasks = getTasks;
exports.findTaskById = findTaskById;
exports.addTask = addTask;