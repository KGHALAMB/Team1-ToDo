/* eslint-disable no-undef */
const connectMongoDB = require('./mongoose.db.config');
const mongoose = require('mongoose');
const userServices = require('./user-services.js');
const userModel = require('./user');
const moduleModel = require('./module');
const moduleServices = require('./module-services.js');

connectMongoDB();

test('adding a user', async () => {
  const user = {
    name: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123'
  };
  const userToAdd = new userModel(user);
  expect(await userServices.addUser(userToAdd)).not.toBe(false);
  await userServices.deleteUser(userToAdd['_id']);
});

test('adding a user (on failure)', async () => {
  const user = {
    fake: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123'
  };
  const userToAdd = new userModel(user);

  expect(await userServices.addUser(userToAdd)).toBe(false);
});

test('deleting a user', async () => {
  const user = {
    name: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123',
    module_list: [new moduleModel({ name: 'School' })]
  };
  const userToAdd = new userModel(user);
  const savedUser = await userToAdd.save();
  await userServices.deleteUser(savedUser['_id']);
  expect(await userModel.findById(savedUser['_id'])).not.toBe(savedUser);
});

test('finding a user by id', async () => {
  const user = {
    name: 'John',
    email: 'john123@gmail.com',
    username: 'John123'
  };
  let target = new userModel(user);
  savedUser = await userServices.addUser(target);
  let result = await userServices.findUserById(savedUser['_id']);
  console.log(result);
  expect(result).toStrictEqual(savedUser['module_list']);
  await userServices.deleteUser(savedUser['_id']);
});

test('finding a user by id (on failure)', async () => {
  const user = {
    name: 'Fran',
    email: 'fran123@gmail.com',
    username: 'Fran123'
  };
  let target = new userModel(user);
  savedUser = await userServices.addUser(target);
  await userServices.deleteUser(savedUser['_id']);
  let result = await userServices.findUserById(savedUser['_id']);
  expect(result).toBe(undefined);
});

test('finding a user by id and updating the module list', async () => {
  const user = {
    name: 'Fran',
    email: 'fran123@gmail.com',
    username: 'Fran123'
  };
  const module = {
    name: 'Work'
  };
  let u = new userModel(user);
  let savedModule = new moduleModel(module);
  savedUser = await userServices.addUser(u);
  await userServices.findAndUpdate(savedUser['_id'], savedModule);
  expect(
    (await userServices.findUserByName('Fran'))[0]['module_list'][0]
  ).toStrictEqual(savedModule['_id']);
  await userServices.deleteUser(savedUser['_id']);
});
/*
test('finding a user by id and deleting a module', async () => {
  const user = {
    name: 'Fran',
    email: 'fran123@gmail.com',
    username: 'Fran123'
  };
  const module = {
    name: 'test'
  };
  let u = new userModel(user);
  let savedModule = new moduleModel(module);
  savedUser = await userServices.addUser(u);
  await userServices.findAndUpdate(savedUser['_id'], savedModule);
  moduleList = await userServices.deleteModule(
    savedUser['_id'],
    savedModule['_id']
  );
  expect(
    (await userServices.findUserByName('Fran'))[0]['module_list']
  ).toStrictEqual([]);
  await userServices.deleteUser(savedUser['_id']);
});
*/
test('finding a user by name', async () => {
  const user = {
    name: 'John',
    email: 'john123@gmail.com',
    username: 'John123'
  };
  let target = new userModel(user);
  await userServices.addUser(target);
  let result = await userServices.findUserByName('John');
  expect(result[0]['_id']).toStrictEqual(target['_id']);
  await userServices.deleteUser(result[0]['_id']);
});

test('finding a user by email', async () => {
  const user = {
    name: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123'
  };
  let target = new userModel(user);
  await userServices.addUser(target);
  let result = await userServices.findUserByEmail('bob123@gmail.com');
  expect(result[0]['_id']).toStrictEqual(target['_id']);
  await userServices.deleteUser(result[0]['_id']);
});

test('finding a user by username', async () => {
  const user = {
    name: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123'
  };
  let target = new userModel(user);
  await userServices.addUser(target);
  let result = await userServices.findUserByUserName('Bob123');
  expect(result[0]['_id']).toStrictEqual(target['_id']);
  await userServices.deleteUser(result[0]['_id']);
});

test('finding a user by module list', async () => {
  const user = {
    name: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123'
  };
  const module = {
    name: 'School'
  };
  let u = new userModel(user);
  let savedModule = new moduleModel(module);
  savedUser = await userServices.addUser(u);
  await userServices.findAndUpdate(savedUser['_id'], savedModule);
  let result = await userServices.findUserByModuleList([savedModule]);
  expect(result[0]['_id']).toStrictEqual(savedUser['_id']);
  await userServices.deleteUser(savedUser['_id']);
});

test('getting a list of users', async () => {
  const user = {
    name: 'Fran',
    email: 'fran123@gmail.com',
    username: 'Fran123'
  };
  const module = {
    name: 'Work'
  };
  let u = new userModel(user);
  let savedModule = new moduleModel(module);
  expect(
    await userServices.getUsers(undefined, undefined, undefined, undefined)
  ).toStrictEqual(await userModel.find());
  savedUser = await userServices.addUser(u);
  await userServices.findAndUpdate(savedUser['_id'], savedModule);
  let result1 = await userServices.getUsers(undefined, undefined, undefined, [
    savedModule
  ]);
  expect(result1[0]['_id']).toStrictEqual(savedUser['_id']);
  let result2 = await userServices.getUsers(
    'Fran',
    undefined,
    undefined,
    undefined
  );
  expect(result2[0]['_id']).toStrictEqual(savedUser['_id']);
  let result3 = await userServices.getUsers(
    undefined,
    undefined,
    'fran123@gmail.com',
    undefined
  );
  expect(result3[0]['_id']).toStrictEqual(savedUser['_id']);
  let result4 = await userServices.getUsers(
    undefined,
    'Fran123',
    undefined,
    undefined
  );
  expect(result4[0]['_id']).toStrictEqual(savedUser['_id']);
  await userServices.deleteUser(savedUser['_id']);
});
test('getting all the usernames', async () => {
  const user = {
    name: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123'
  };
  let target = new userModel(user);
  let savedUser = await userServices.addUser(target);
  let result = await userServices.getAllUsernames();
  expect(result).toStrictEqual(
    (await userModel.find()).map(function (p) {
      return p.username;
    })
  );
  await userServices.deleteUser(savedUser['_id']);
});
test('verifying user', async () => {
  const user = {
    name: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123',
    password: 'df0891h709dn71w'
  };
  let target = new userModel(user);
  let savedUser = await userServices.addUser(target);
  let result = await userServices.verifyUser(
    savedUser['username'],
    savedUser['password']
  );
  expect(result).not.toBe(false);
  let result2 = await userServices.verifyUser(savedUser['username'], '');
  expect(result2).toBe(false);
  await userServices.deleteUser(savedUser['_id']);
});
test('removing module from a user', async () => {
  const module = {
    name: 'Work'
  };
  let targetMod = new moduleModel(module);
  await moduleServices.addModule(targetMod);
  const user = {
    name: 'Bob',
    email: 'bob123@gmail.com',
    username: 'Bob123',
    module_list: [targetMod['_id']]
  };
  let target = new userModel(user);
  let savedUser = await userServices.addUser(target);
  let result = await userServices.deleteModule(target['_id'], targetMod['_id']);
  expect(result['modifiedCount']).toStrictEqual(1);
  await userServices.deleteUser(savedUser['_id']);
});
afterAll(() => {
  mongoose.connection.close();
});
