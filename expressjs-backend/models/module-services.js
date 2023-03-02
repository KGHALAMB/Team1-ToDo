const connectMongoDB = require('./mongoose.db.config');
const moduleModel = require('./module');

connectMongoDB();

async function getModules(name, task_list, user_list) {
  let result;
  if (name === undefined && task_list == undefined && user_list == undefined) {
    result = await moduleModel.find();
  } else if (task_list && !name && !user_list) {
    result = await findModuleByTaskList(task_list);
  } else if (member_list && !name && !user_list) {
    result = await findModuleByUserList(member_list);
  } else {
    result = await findModuleByName(name);
  }
  return result;
}

async function findModuleById(id) {
  try {
    return await moduleModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
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

async function findModuleByTaskList(admin_list) {
  return await moduleModel.find({ admin_list: admin_list });
}

async function findModuleByUserList(member_list) {
  return await moduleModel.find({ member_list: member_list });
}

exports.getModules = getModules;
exports.findModuleById = findModuleById;
exports.addModule = addModule;
