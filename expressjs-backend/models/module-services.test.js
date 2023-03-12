/* eslint-disable no-undef */

const connectMongoDB = require('./mongoose.db.config');
const mongoose = require('mongoose');
const moduleServices = require('./module-services.js');
const moduleModel = require('./module');
const taskModel = require('./task');
connectMongoDB();

test('adding a module', async () => {
  const module = {
    name: 'a'
  };
  const moduleToAdd = new moduleModel(module);

  expect(await moduleServices.addModule(moduleToAdd)).not.toBe(false);
  await moduleServices.deleteModule(moduleToAdd['_id']);
});
test('adding a module (on failure)', async () => {
  const module = {
    fake: 'a'
  };
  const moduleToAdd = new moduleModel(module);

  expect(await moduleServices.addModule(moduleToAdd)).toBe(false);
});
test('deleting a module', async () => {
  const module = {
    name: 'a'
  };
  const moduleToAdd = new moduleModel(module);
  const savedModule = await moduleToAdd.save();
  await moduleServices.deleteModule(savedModule['_id']);
  expect(await moduleModel.findById(savedModule['_id'])).not.toBe(savedModule);
});
test('finding a module by name', async () => {
  const module = {
    name: 'a'
  };
  let target = new moduleModel(module);
  await moduleServices.addModule(target);
  let result = await moduleServices.findModuleByName('a');
  expect(result[0]['_id']).toStrictEqual(target['_id']);
  await moduleServices.deleteModule(result[0]['_id']);
});
test('finding a module by id', async () => {
  const module = {
    name: 'a'
  };
  let target = new moduleModel(module);
  savedModule = await moduleServices.addModule(target);
  let result = await moduleServices.findModuleById(savedModule['_id']);
  expect(result).toStrictEqual(savedModule['task_list']);
  await moduleServices.deleteModule(savedModule['_id']);
});
test('finding a module by id (on failure)', async () => {
  const module = {
    name: 'a'
  };
  let target = new moduleModel(module);
  savedModule = await moduleServices.addModule(target);
  await moduleServices.deleteModule(savedModule['_id']);
  let result = await moduleServices.findModuleById(savedModule['_id']);
  expect(result).toBe(undefined);
});
test('finding a module by id and updating the task list', async () => {
  const module = {
    name: 'a'
  };
  const task = {
    title: 'test'
  };
  let mod = new moduleModel(module);
  let savedTask = new taskModel(task);
  savedModule = await moduleServices.addModule(mod);
  await moduleServices.findAndUpdate(savedModule['_id'], savedTask);
  expect(
    (await moduleServices.findModuleByName('a'))[0]['task_list'][0]
  ).toStrictEqual(savedTask['_id']);
  await moduleServices.deleteModule(savedModule['_id']);
});

test('finding a module by id and deleting a task', async () => {
  const module = {
    name: 'a'
  };
  const task = {
    title: 'test'
  };
  let mod = new moduleModel(module);
  let savedTask = new taskModel(task);
  savedModule = await moduleServices.addModule(mod);
  await moduleServices.findAndUpdate(savedModule['_id'], savedTask);
  taskList = await moduleServices.deleteTask(
    savedModule['_id'],
    savedTask['_id']
  );
  expect(
    (await moduleServices.findModuleByName('a'))[0]['task_list']
  ).toStrictEqual([]);
  await moduleServices.deleteModule(savedModule['_id']);
});
test('finding a module by task list', async () => {
  const module = {
    name: 'a'
  };
  const task = {
    title: 'test'
  };
  let mod = new moduleModel(module);
  let savedTask = new taskModel(task);
  savedModule = await moduleServices.addModule(mod);
  await moduleServices.findAndUpdate(savedModule['_id'], savedTask);
  let result = await moduleServices.findModuleByTaskList([savedTask]);
  expect(result[0]['_id']).toStrictEqual(savedModule['_id']);
  await moduleServices.deleteModule(savedModule['_id']);
});
test('getting a list of modules', async () => {
  const module = {
    name: 'a'
  };
  const task = {
    title: 'test'
  };
  let mod = new moduleModel(module);
  let savedTask = new taskModel(task);
  expect(
    await moduleServices.getModules(undefined, undefined, undefined)
  ).toStrictEqual(await moduleModel.find());
  savedModule = await moduleServices.addModule(mod);
  await moduleServices.findAndUpdate(savedModule['_id'], savedTask);
  let result1 = await moduleServices.getModules(
    undefined,
    [savedTask],
    undefined
  );
  expect(result1[0]['_id']).toStrictEqual(savedModule['_id']);
  let result2 = await moduleServices.getModules('a', undefined, undefined);
  expect(result2[0]['name']).toStrictEqual(savedModule['name']);

  await moduleServices.deleteModule(savedModule['_id']);
});
afterAll(() => {
  mongoose.connection.close();
});
