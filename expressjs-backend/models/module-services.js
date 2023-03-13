const connectMongoDB = require('./mongoose.db.config');
const moduleModel = require('./module');

connectMongoDB();

async function getModules(name, task_list, user_list) {
  let result;
  if (name === undefined && task_list == undefined && user_list == undefined) {
    result = await moduleModel.find();
  } else if (task_list && !name && !user_list) {
    result = await findModuleByTaskList(task_list);
  } /* else if (user_list && !name && !task_list) {
    result = await findModuleByUserList(user_list);
  } */ else {
    result = await findModuleByName(name);
  }
  return result;
}

async function findModuleById(id) {
  try {
    const mod = await moduleModel.findById(id);
    const query = { name: mod.name };

    const tasksList = await moduleModel.find(query).populate('task_list');

    return tasksList[0].task_list;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findAndUpdate(id, task) {
  let mod = await moduleModel.findById(id);
  const query = { name: mod.name };

  var updatedMod = await moduleModel.updateOne(query, {
    $push: { task_list: task._id }
  });

  mod.save();
  return updatedMod;
}

async function addModule(module) {
  try {
    const moduleToAdd = new moduleModel(module);
    const savedModule = await moduleToAdd.save();
    return savedModule;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findModuleByName(name) {
  return await moduleModel.find({ name: name });
}

async function findModuleByTaskList(task_list) {
  return await moduleModel.find({ task_list: task_list });
}
//will uncomment once sharing function is implemented
/*
async function findModuleByUserList(member_list) {
  return await moduleModel.find({ member_list: member_list });
}
*/

async function deleteModule(id) {
  return await moduleModel.findByIdAndDelete(id);
}

async function deleteTask(modId, taskId) {
  let mod = await moduleModel.findById(modId);
  const query = { name: mod.name };

  return await moduleModel.updateOne(query, {
    $pull: { task_list: taskId }
  });
}

exports.getModules = getModules;
exports.findModuleById = findModuleById;
exports.findModuleByTaskList = findModuleByTaskList;
exports.findModuleByName = findModuleByName;
exports.addModule = addModule;
exports.deleteModule = deleteModule;
exports.findAndUpdate = findAndUpdate;
exports.deleteTask = deleteTask;
