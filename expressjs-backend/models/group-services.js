const connectMongoDB = require('./mongoose.db.config');
const groupModel = require('./group');

connectMongoDB();

async function getGroups(name, admin_list, member_list, module_list) {
  let result;
  if (
    name === undefined &&
    admin_list == undefined &&
    member_list == undefined &&
    module_list == undefined
  ) {
    result = await groupModel.find();
  } else if (admin_list && !name && !member_list && !module_list) {
    result = await findGroupByAdminList(admin_list);
  } else if (member_list && !name && !admin_list && !module_list) {
    result = await findGroupByMemberList(member_list);
  } else if (module_list && !name && !admin_list && !member_list) {
    result = await findGroupByModuleList(module_list);
  } else {
    result = await findGroupByName(name);
  }
  return result;
}

async function findGroupById(id) {
  try {
    return await groupModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addGroup(group) {
  try {
    const groupToAdd = new groupModel(group);
    const savedGroup = await groupToAdd.save();
    return savedGroup;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findGroupByName(name) {
  return await groupModel.find({ name: name });
}

async function findGroupByAdminList(admin_list) {
  return await groupModel.find({ admin_list: admin_list });
}

async function findGroupByMemberList(member_list) {
  return await groupModel.find({ member_list: member_list });
}

async function findGroupByModuleList(module_list) {
  return await groupModel.find({ module_list: module_list });
}

exports.getGroups = getGroups;
exports.findGroupById = findGroupById;
exports.addGroup = addGroup;
