const connectMongoDB = require('./mongoose.db.config');
const subtaskModel = require('./subtask');

connectMongoDB();

async function getSubtasks(title, description, category, duration, priority) {
  let result;
  if (
    title === undefined &&
    description === undefined &&
    category === undefined &&
    duration === undefined &&
    priority === undefined
  ) {
    result = await subtaskModel.find();
  } else if (title && !description && !category && !duration && !priority) {
    result = await findSubtaskByTitle(title);
  } else if (description && !title && !category && !duration && !priority) {
    result = await findSubtaskByDescription(description);
    /*} else if (category && !title && !description && !duration && !priority) {
    result = await findSubtaskByCategory(category);
  } else if (duration && !title && !description && !category && !priority) {
    result = await findSubtaskByDuration(duration);*/
  } else if (priority && !title && !description && !category && !duration) {
    result = await findSubtaskByPriority(priority);
  } else {
    result = await findSubtask(
      title,
      description,
      category,
      duration,
      priority
    );
  }
  return result;
}

// I don't think this function needs a try catch, everytime findById doesnt work it will return a null on its own
async function findSubtaskById(id) {
  //try {
  return await subtaskModel.findById(id);
  /*} catch (error) {
    console.log(error);
    return undefined;
  }*/
}

async function addSubtask(subtask) {
  try {
    const subtaskToAdd = new subtaskModel(subtask);
    const savedSubtask = await subtaskToAdd.save();
    return savedSubtask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findSubtaskByTitle(title) {
  return await subtaskModel.find({ title: title });
}

async function findSubtaskByDescription(description) {
  return await subtaskModel.find({ description: description });
}
//subtask doesnt have a category field
/*
async function findSubtaskByCategory(category) {
  return await subtaskModel.find({ category: category });
}*/
//subtask doesnt have a duration field
/*
async function findSubtaskByDuration(duration) {
  return await subtaskModel.find({ duration: duration });
}
*/
async function findSubtaskByPriority(priority) {
  return await subtaskModel.find({ priority: priority });
}

async function findSubtask(title, description, category, duration, priority) {
  return await subtaskModel.find({
    title: title,
    description: description,
    category: category,
    duration: duration,
    priority: priority
  });
}

async function deleteSubtask(id) {
  return await subtaskModel.findByIdAndDelete(id);
}

exports.getSubtasks = getSubtasks;
exports.addSubtask = addSubtask;
exports.findSubtaskById = findSubtaskById;
exports.findSubtaskByTitle = findSubtaskByTitle;
exports.findSubtaskByDescription = findSubtaskByDescription;
//exports.findSubtaskByCategory = findSubtaskByCategory;
//exports.findSubtaskByDuration = findSubtaskByDuration;
exports.findSubtaskByPriority = findSubtaskByPriority;
exports.findSubtask = findSubtask;
exports.deleteSubtask = deleteSubtask;
