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

test('finding a subtask', async () => {
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
    savedSubtask['date'],
    savedSubtask['priority']
  );
  console.log(result);
  expect(result[0]['_id']).toStrictEqual(savedSubtask['_id']);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
});
test('getting a list of subtasks', async () => {
  subtask = new subtaskModel({
    title: 'a',
    description: 'b',
    date: 'c',
    priority: -1
  });
  savedSubtask = await subtaskServices.addSubtask(subtask);
  expect(
    await subtaskServices.getSubtasks(
      undefined,
      undefined,
      undefined,
      undefined
    )
  ).toStrictEqual(await subtaskModel.find());
  savedSubtask = await subtaskServices.addSubtask(savedSubtask);
  let result1 = await subtaskServices.getSubtasks(
    savedSubtask['title'],
    undefined,
    undefined,
    undefined
  );
  expect(result1[0]['_id']).toStrictEqual(savedSubtask['_id']);
  let result2 = await subtaskServices.getSubtasks(
    undefined,
    savedSubtask['description'],
    undefined,
    undefined
  );
  expect(result2[0]['_id']).toStrictEqual(savedSubtask['_id']);
  let result3 = await subtaskServices.getSubtasks(
    undefined,
    undefined,
    savedSubtask['date'],
    undefined
  );
  expect(result3[0]['_id']).toStrictEqual(savedSubtask['_id']);
  let result4 = await subtaskServices.getSubtasks(
    undefined,
    undefined,
    undefined,
    savedSubtask['priority']
  );
  expect(result4[0]['_id']).toStrictEqual(savedSubtask['_id']);
  let result5 = await subtaskServices.getSubtasks(
    savedSubtask['title'],
    savedSubtask['description'],
    savedSubtask['date'],
    savedSubtask['priority']
  );
  expect(result5[0]['_id']).toStrictEqual(savedSubtask['_id']);
  await subtaskServices.deleteSubtask(savedSubtask['_id']);
});

afterAll(() => {
  mongoose.connection.close();
});
