/* eslint-disable no-undef */
const connectMongoDB = require('./mongoose.db.config');
const mongoose = require('mongoose');
const taskServices = require('./task-services.js');
const taskModel = require('./task');
const subtaskModel = require('./subtask');
connectMongoDB();

test('adding a task', async () => {
  const task = {
    title: 'a'
  };
  const taskToAdd = new taskModel(task);
  expect(await taskServices.addTask(taskToAdd)).not.toBe(false);
  await taskServices.deleteTask(taskToAdd['_id']);
});

test('adding a task (on failure)', async () => {
  const task = {
    fake: 'a'
  };
  const taskToAdd = new taskModel(task);

  expect(await taskServices.addTask(taskToAdd)).toBe(false);
});

test('deleting a task', async () => {
  const task = {
    title: 'a',
    subtasks: [
      new subtaskModel({ title: 'a', description: 'b', date: 'c', priority: 1 })
    ]
  };
  const taskToAdd = new taskModel(task);
  const savedTask = await taskToAdd.save();
  await taskServices.deleteTask(savedTask['_id']);
  expect(await taskModel.findById(savedTask['_id'])).not.toBe(savedTask);
});

test('finding a task by title', async () => {
  const task = {
    title: 'a'
  };
  let target = new taskModel(task);
  await taskServices.addTask(target);
  let result = await taskServices.findTaskByTitle('a');
  expect(result[0]['_id']).toStrictEqual(target['_id']);
  await taskServices.deleteTask(result[0]['_id']);
});

test('finding a task by id', async () => {
  const task = {
    title: 'a'
  };
  let target = new taskModel(task);
  savedTask = await taskServices.addTask(target);
  let result = await taskServices.findTaskById(savedTask['_id']);
  console.log(result);
  expect(result).toStrictEqual(savedTask['subtasks']);
  await taskServices.deleteTask(savedTask['_id']);
});

test('finding a task by id (on failure)', async () => {
  const task = {
    title: 'a'
  };
  let target = new taskModel(task);
  savedTask = await taskServices.addTask(target);
  await taskServices.deleteTask(savedTask['_id']);
  let result = await taskServices.findTaskById(savedTask['_id']);
  expect(result).toBe(undefined);
});

test('finding a task by id and updating the subtask list', async () => {
  const task = {
    title: 'a'
  };
  const subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: 1
  });

  let savedTask = new taskModel(task);
  savedTask = await taskServices.addTask(savedTask);
  await taskServices.findAndUpdate(savedTask['_id'], subtask);
  expect(
    (await taskServices.findTaskByTitle('a'))[0]['subtasks'][0]
  ).toStrictEqual(subtask['_id']);
  await taskServices.deleteTask(savedTask['_id']);
});

test('finding a task by id and deleting a subtask', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: 1
  });
  const task = new taskModel({
    title: 'a',
    subtasks: [subtask['_id']]
  });
  await taskServices.addTask(task);
  taskList = await taskServices.deleteSubtask(task['_id'], task['subtasks'][0]);
  expect(
    (await taskServices.findTaskByTitle('a'))[0]['subtasks']
  ).toStrictEqual([]);
  await taskServices.deleteTask(task['_id']);
});
test('getting a list of tasks', async () => {
  const task = {
    title: 'a'
  };
  let savedTask = new taskModel(task);
  expect(await taskServices.getTasks(undefined)).toStrictEqual(
    await taskModel.find()
  );
  savedTask2 = await taskServices.addTask(savedTask);
  let result1 = await taskServices.getTasks('a');
  expect(result1[0]['_id']).toStrictEqual(savedTask2['_id']);
  await taskServices.deleteTask(savedTask['_id']);
});

afterAll(() => {
  mongoose.connection.close();
});
