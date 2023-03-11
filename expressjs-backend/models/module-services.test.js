/* eslint-disable no-undef */
/**const userServices = require("./models/task-services");
// const mongoose = require("mongoose");
// const ObjectId = require("mongoose").Types.ObjectId;

test("test db query task #1", async () => {
  let result = await userServices.findUserByName("Joe");

  // expected = {
  //   _id: ObjectId("600f49555f2c7e977e0652c8"),
  //   job: "Mailman",
  //   name: "Joe",
  // };

  expect(result[0].name).toBe("Joe");
  expect(result[0].job).toBe("Mailman");
});

// afterAll(async () => {
//   await userServices.disconnectDB();
// });**/

const moduleServices = require('./module-services.js');
const moduleModel = require('./module');
/*
test('finding a module by id', async () => {
  const module = {
    name: 'a',
    task_list: [],
    user_list: []
  };
  let target = new moduleModel(module);
  console.log(target['_id']);
  let result = await taskServices.findModuleById(target['_id']);
  expect(target).toStrictEqual(result);
});
*/

test('finding a module by name', async () => {
  const module = {
    name: 'a'
  };
  let target = new moduleModel(module);
  console.log(target.name);
  let result = await moduleServices.findModuleByName('a');
  console.log(result);
  expect(result).toStrictEqual(target);
});
/*
test('finding a task by title', async () => {
  const task = {
    title: 'a',
    description: 'b',
    category: 'd',
    duration: 'e',
    priority: 1
  };
  let target = new taskModel(task);
  let result = await taskServices.findTask(
    task['title'],
    task['description'],
    task['category'],
    task['duration'],
    task['priority']
  );
  console.log(result);
  expect(target).toStrictEqual(result);
});*/
