const connectMongoDB = require("./mongoose.db.config");
const taskModel = require("./task");

connectMongoDB();


async function getTasks(title, description, category, duration, priority) {
  let result;
  if (title === undefined && description === undefined
    && category === undefined && duration === undefined
    && priority === undefined) {
    result = await taskModel.find();
  } else if (title && !description && !category && !duration && !priority) {
    result = await findTaskByTitle(title);
  } else if (description && !title && !category && !duration && !priority) {
    result = await findTaskByDescription(description);
  } else if (category && !title && !description && !duration && !priority) {
    result = await findTaskByCategory(category);
  } else if (duration && !title && !description && !category && !priority) {
    result = await findTaskByDuration(duration);
  } else if (priority && !title && !description && !category && !duration) {
    result = await findTaskByPriority(priority);
  } else {
    result = await findTask(title, description, category, duration, priority);
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
  return await taskModel.find({ title: title });
}

async function findTaskByDescription(description) {
  return await taskModel.find({ description: description });
}

async function findTaskByCategory(category) {
    return await taskModel.find({ category: category });
}

async function findTaskByDuration(duration) {
    return await taskModel.find({ duration: duration });
}

async function findTaskByPriority(priority) {
    return await taskModel.find({ priority: priority });
}

async function findTask(title, description, category, duration, priority) {
  return await taskModel.find({ title: title, description: description, category: category, duration: duration, priority: priority });
}

async function deleteTask(id) {
  return await taskModel.findByIdAndDelete(id);
}

exports.getTasks = getTasks;
exports.addTask = addTask;
exports.findTaskById = findTaskById;
exports.findTaskByTitle = findTaskByTitle;
exports.findTaskByDescription = findTaskByDescription;
exports.findTaskByCategory = findTaskByCategory;
exports.findTaskByDuration = findTaskByDuration;
exports.findTaskByPriority = findTaskByPriority;
exports.findTask = findTask;
exports.deleteTask = deleteTask;