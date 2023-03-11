const connectMongoDB = require('./mongoose.db.config');
const taskModel = require('./task');

connectMongoDB();

async function getTasks(title, category) {
  let result;
  if (title === undefined && category === undefined) {
    result = await taskModel.find();
  } else if (title && !category) {
    result = await findTaskByTitle(title);
  } else if (category && !title) {
    result = await findTaskByCategory(category);
  } else {
    result = await findTask(title, category);
  }
  return result;
}

async function findTaskById(id) {
  try {
    const task = await taskModel.findById(id);
    const query = { title: task.title };

    const subtasksList = await taskModel.find(query).populate('subtasks');
    console.log(subtasksList[0].subtasks);
    return subtasksList[0].subtasks;
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

async function findAndUpdate(id, subtask) {
  let task = await taskModel.findById(id);
  const query = { title: task.title };

  var updatedTask = await taskModel.updateOne(query, {
    $push: { subtasks: subtask._id }
  });

  task.save(function (error) {
    if (!error) {
      taskModel
        .find(query)
        .populate('subtasks')
        .exec(function (error, subtasks) {
          console.log(JSON.stringify(subtasks, null, '\t'));
        });
    }
  });

  return updatedTask;
}

async function findTaskByTitle(title) {
  return await taskModel.find({ title: title });
}

async function findTaskByCategory(category) {
  return await taskModel.find({ category: category });
}

async function findTask(title, category) {
  return await taskModel.find({
    title: title,
    category: category
  });
}

async function deleteTask(id) {
  return await taskModel.findByIdAndDelete(id);
}

async function deleteSubtask(taskId, subtaskId) {
  let task = await taskModel.findById(taskId);
  const query = { title: task.title };

  return await taskModel.updateOne(query, {
    $pull: { subtasks: subtaskId }
  });
}

exports.getTasks = getTasks;
exports.addTask = addTask;
exports.findTaskById = findTaskById;
exports.findTaskByTitle = findTaskByTitle;
exports.findTaskByCategory = findTaskByCategory;
exports.findTask = findTask;
exports.deleteTask = deleteTask;
exports.findAndUpdate = findAndUpdate;
exports.deleteSubtask = deleteSubtask;
