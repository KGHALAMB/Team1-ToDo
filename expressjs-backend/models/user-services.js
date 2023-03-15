const { ALL } = require('dns');
const connectMongoDB = require('./mongoose.db.config');
const userModel = require('./user');

connectMongoDB();

async function getUsers(name, username, email, module_list) {
  let result;
  if (
    name === undefined &&
    username === undefined &&
    module_list === undefined
  ) {
    result = await userModel.find();
  } else if (username && !name && !email && !module_list) {
    result = await findUserByUserName(username);
  } else if (email && !username && !name && !module_list) {
    result = await findUserByEmail(email);
  } else if (module_list && !username && !name && !email) {
    result = await findUserByModuleList(module_list);
  } else {
    result = await findUserByName(name);
  }
  return result;
}

async function findUserById(id) {
  try {
    const u = await userModel.findById(id);
    const query = { _id: u._id };

    const modulesList = await userModel.find(query).populate('module_list');

    return modulesList[0].module_list;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findAndUpdate(id, module) {
  let new_user = await userModel.findById(id);
  const query = {
    name: new_user.name,
    email: new_user.email,
    username: new_user.username
  };

  var updatedUser = await userModel.updateOne(query, {
    $push: { module_list: module._id }
  });

  new_user.save();
  return updatedUser;
}

/* === New Function === */
async function getAllUsernames() {
  var usernameList = (await userModel.find()).map(function (p) {
    return p.username;
  });

  return usernameList;
}

/* === New Function === */
async function verifyUser(username, password) {
  const user_query = { username: username, password: password };
  // const pass_query = { password: password };
  try {
    let userId = await userModel.find(user_query);
    console.log(userId);
    userId = userId[0]['_id'];
    let user = await userModel.findById(userId);
    console.log(user);
    return user;
  } catch {
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByUserName(username) {
  return await userModel.find({ username: username });
}

async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}

async function findUserByModuleList(module_list) {
  return await userModel.find({ module_list: module_list });
}

async function deleteUser(id) {
  return await userModel.findByIdAndDelete(id);
}

async function deleteModule(userId, modId) {
  let user = await userModel.findById(userId);
  const query = { name: user.name };

  return await userModel.updateOne(query, {
    $pull: { module_list: modId }
  });
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.findUserByName = findUserByName;
exports.findUserByEmail = findUserByEmail;
exports.findUserByUserName = findUserByUserName;
exports.findUserByModuleList = findUserByModuleList;
exports.addUser = addUser;
exports.findAndUpdate = findAndUpdate;
exports.deleteUser = deleteUser;
exports.deleteModule = deleteModule;
exports.getAllUsernames = getAllUsernames;
exports.verifyUser = verifyUser;
