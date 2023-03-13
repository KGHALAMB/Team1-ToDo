/* eslint-disable no-undef */
const connectMongoDB = require('./mongoose.db.config');
const mongoose = require('mongoose');
const subtaskServices = require('./subtask-services.js');
const subtaskModel = require('./subtask');
connectMongoDB();

test('adding a subtask', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: 1
  });
  expect(await subtaskServices.addSubtask(subtask)).not.toBe(false);
  await subtaskServices.deleteSubtask(subtask['_id']);
});

test('adding a subtask (on failure)', async () => {
  subtask = new subtaskModel({
    fake1: 'a',
    fake2: 'b',
    fake3: 'c',
    fake4: 1
  });

  expect(await subtaskServices.addSubtask(subtask)).toBe(false);
});

test('deleting a subtask', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: 1
  });
  await subtaskServices.addSubtask(subtask);
  expect(
    (await subtaskServices.deleteSubtask(subtask['_id']))['_id']
  ).toStrictEqual(subtask['_id']);
});

test('finding a subtask by title', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: 1
  });
  await subtaskServices.addSubtask(subtask);
  let result = await subtaskServices.findSubtaskByTitle('a');
  expect(result[0]['_id']).toStrictEqual(subtask['_id']);
  await subtaskServices.deleteSubtask(result[0]['_id']);
});

test('finding a subtask by id', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: 1
  });
  savedSubtask = await subtaskServices.addSubtask(subtask);
  let result = await subtaskServices.findSubtaskById(savedSubtask['_id']);
  expect(result['_id']).toStrictEqual(savedSubtask['_id']);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
});

test('finding a task by id (on failure)', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: 1,
    fake1: 1
  });
  savedSubtask = await subtaskServices.addSubtask(subtask);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
  let result = await subtaskServices.findSubtaskById(savedSubtask['_id']);
  expect(result).toBe(null);
});
test('finding a subtask by description', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: 1
  });
  savedSubtask = await subtaskServices.addSubtask(subtask);
  let result = await subtaskServices.findSubtaskByDescription(
    savedSubtask['description']
  );
  expect(result[0]['_id']).toStrictEqual(savedSubtask['_id']);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
});
test('finding a subtask by priority', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: -1
  });
  savedSubtask = await subtaskServices.addSubtask(subtask);
  let result = await subtaskServices.findSubtaskByPriority(
    savedSubtask['priority']
  );
  expect(result[0]['_id']).toStrictEqual(savedSubtask['_id']);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
});
/*
test('finding a subtask by priority', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: -1
  });
  savedSubtask = await subtaskServices.addSubtask(subtask);
  let result = await subtaskServices.findSubtask(
    savedSubtask['title'],
    savedSubtask['description'],
    savedSubtask['']
  );
  expect(result[0]['_id']).toStrictEqual(savedSubtask['_id']);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
});*/
/*
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

  let savedSubtask = new taskModel(task);
  savedSubtask = await subtaskServices.addSubtask(savedSubtask);
  await subtaskServices.findAndUpdate(savedSubtask['_id'], subtask);
  expect(
    (await subtaskServices.findTaskByTitle('a'))[0]['subtasks'][0]
  ).toStrictEqual(subtask['_id']);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
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
  await subtaskServices.addSubtask(task);
  taskList = await subtaskServices.deleteSubtask(task['_id'], task['subtasks'][0]);
  expect(
    (await subtaskServices.findTaskByTitle('a'))[0]['subtasks']
  ).toStrictEqual([]);
  await subtaskServices.deleteSubtask(task['_id']);
});
test('getting a list of tasks', async () => {
  const task = {
    title: 'a'
  };
  let savedSubtask = new taskModel(task);
  expect(await subtaskServices.getTasks(undefined)).toStrictEqual(
    await taskModel.find()
  );
  savedTask2 = await subtaskServices.addSubtask(savedSubtask);
  let result1 = await subtaskSer vices.getTasks('a');
  expect(result1[0]['_id']).toStrictEqual(savedTask2['_id']);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
});
*/
afterAll(() => {
  mongoose.connection.close();
});
