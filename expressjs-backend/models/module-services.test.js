/* eslint-disable no-undef */

const connectMongoDB = require('./mongoose.db.config');
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
  console.log(target['_id']);
  await moduleServices.deleteModule(result[0]['_id']);
});
test('finding a module by id', async () => {
  const module = {
    name: 'a'
  };
  let target = new moduleModel(module);
  savedModule = await moduleServices.addModule(target);
  console.log(savedModule);
  let result = await moduleServices.findModuleById(savedModule['_id']);
  console.log(result);
  expect(result['_id']).toStrictEqual(savedModule['_id']);
  await moduleServices.deleteModule(savedModule['_id']);
  let result2 = await moduleServices.findModuleById(savedModule['_id']);
  expect(result2).toBe(null);
});
test('finding a module by id (on failure)', async () => {
  const module = {
    name: 'a'
  };
  let target = new moduleModel(module);
  savedModule = await moduleServices.addModule(target);
  await moduleServices.deleteModule(savedModule['_id']);
  let result = await moduleServices.findModuleById(savedModule['_id']);
  console.log(result);
  expect(result).toBe(null);
});
test('finding a module ');
