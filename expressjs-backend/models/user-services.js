const userModel = require("./user");

connectMongooseDB();

async function getUsers(name, username, password, group_list) {
  let result;
  if (name === undefined && username === undefined && password === undefined) {
    result = await userModel.find();
  } else if (username && !name && !email && !password) {
    result = await findUserByUserName(username);
  } else if (email && !username && !name && !password) {
    result = await findUserByEmail(email);
  } else if (group_list && !email && !username && !name && !password) {
    result = await findUserByGroupList(group_list);
  } else {
    result = await findUserByUserNameAndEmail(username, email);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
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

async function findUserByUserName(username) {
  return await userModel.find({ username: username });
}

async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}

async function findUserByUserNameAndEmail(username, email) {
  return await userModel.find({ username: username, email: email });
}

async function findUserByGroupList(group_list) {
    return await userModel.find({ group_list: group_list });
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
