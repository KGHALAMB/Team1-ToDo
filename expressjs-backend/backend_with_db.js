const express = require('express');
const cors = require('cors');

const taskServices = require('./models/task-services');
const subtaskServices = require('./models/subtask-services');
const moduleServices = require('./models/module-services');
const userServices = require('./models/user-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//tasks
app.get('/tasks', async (req, res) => {
  const title = req.query['title'];
  const description = req.query['description'];
  const category = req.query['category'];
  const duration = req.query['duration'];
  const priority = req.query['priority'];

  if (
    title === undefined &&
    description === undefined &&
    category == undefined &&
    duration == undefined &&
    priority == undefined
  ) {
    try {
      const tasks_from_db = await taskServices.getTasks();
      res.send({ tasks_list: tasks_from_db });
    } catch (error) {
      console.log('Mongoose error: ' + error);
      res.status(500).send('An error ocurred in the server.');
    }
  } else if (
    title &&
    description === undefined &&
    category == undefined &&
    duration == undefined &&
    priority == undefined
  ) {
    let result = await taskServices.findTaskByTitle(title);
    result = { tasks_list: result };
    res.send(result);
  } else if (
    title === undefined &&
    description &&
    category == undefined &&
    duration == undefined &&
    priority == undefined
  ) {
    let result = await taskServices.findTaskByDescription(description);
    result = { tasks_list: result };
    res.send(result);
  } else if (
    title === undefined &&
    description == undefined &&
    category &&
    duration == undefined &&
    priority == undefined
  ) {
    let result = await taskServices.findTaskByCategory(category);
    result = { tasks_list: result };
    res.send(result);
  } else if (
    title === undefined &&
    description == undefined &&
    category == undefined &&
    duration &&
    priority == undefined
  ) {
    let result = await taskServices.findTaskByDuration(duration);
    result = { tasks_list: result };
    res.send(result);
  } else if (
    title === undefined &&
    description == undefined &&
    category == undefined &&
    duration == undefined &&
    priority
  ) {
    let result = await taskServices.findTaskByPriority(priority);
    result = { tasks_list: result };
    res.send(result);
  } else {
    let result = await taskServices.findTask(
      title,
      description,
      category,
      duration,
      priority
    );
    result = { tasks_list: result };
    res.send(result);
  }
});

app.get('/tasks/:id', async (req, res) => {
  const id = req.params['id'];
  let result = await taskServices.findTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else {
    result = { tasks_list: result };
    res.send(result);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const id = req.params['id'];
  if (deleteTaskById(id)) res.status(204).end();
  else res.status(404).send('Resource not found.');
});

async function deleteTaskById(id) {
  try {
    if (await taskServices.deleteTask(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.patch('/tasks/:id', async (req, res) => {
  const id = req.params['id'];
  const updatedTask = req.body;
  const result = await updateTask(id, updatedTask);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send('Resource not found.');
  else if (result === 500)
    res.status(500).send('An error ocurred in the server.');
});

async function updateTask(id, updatedTask) {
  try {
    const result = await taskServices.findByIdAndUpdate(id, updatedTask);
    if (result) return 204;
    else return 404;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

// modules
app.get('/modules', async (req, res) => {
  const name = req.query['name'];
  const task_list = req.query['task_list'];
  const user_list = req.query['user_list'];
  try {
    const result = await moduleServices.getModules(name, task_list, user_list);
    res.send({ modules_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error ocurred in the server.');
  }
});

app.get('/modules/:id', async (req, res) => {
  const id = req.params['id'];
  let result = await moduleServices.findModuleById(id);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else {
    res.send(result);
  }
});

app.delete('/modules/:id', async (req, res) => {
  const id = req.params['id'];
  if (deleteModuleById(id)) res.status(204).end();
  else res.status(404).send('Resource not found.');
});

async function deleteModuleById(id) {
  try {
    if (await moduleServices.deleteModule(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
app.post('/modules', async (req, res) => {
  const module = req.body;
  const savedModule = await moduleServices.addModule(module);
  if (savedModule) res.status(201).send(savedModule);
  else res.status(500).end();
});

app.patch('/modules/:id', async (req, res) => {
  const id = req.params['id'];
  const updatedModule = req.body;
  const result = await updateModule(id, updatedModule);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send('Resource not found.');
  else if (result === 500)
    res.status(500).send('An error ocurred in the server.');
});

async function updateModule(id, updatedModule) {
  try {
    const result = await moduleServices.findByIdAndUpdate(id, updatedModule);
    if (result) return 204;
    else return 404;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

app.post('/modules/:id', async (req, res) => {
  const id = req.params['id'];
  const newTask = await taskServices.addTask(req.body);
  let mod = await moduleServices.findAndUpdate(id, newTask);

  if (mod) res.status(201).send(newTask._id);
  else res.status(500).end();
});

app.delete('/modules/:modId/:taskId', async (req, res) => {
  const modId = req.params['modId'];
  const taskId = req.params['taskId'];

  if (deleteTaskByModAndTaskId(modId, taskId)) res.status(204).end();
  else res.status(404).end();
});

async function deleteTaskByModAndTaskId(modId, taskId) {
  try {
    if (
      (await taskServices.deleteTask(taskId)) &&
      (await moduleServices.deleteTask(modId, taskId))
    )
      return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.get('/modules/:modId/:taskId', async (req, res) => {
  const taskId = req.params['taskId'];
  let result = await taskServices.findTaskById(taskId);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else {
    res.send(result);
  }
});

app.post('/modules/:modId/:taskId', async (req, res) => {
  const taskId = req.params['taskId'];
  const newSubtask = await subtaskServices.addSubtask(req.body);
  let task = await taskServices.findAndUpdate(taskId, newSubtask);
  if (task) res.status(201).send(newSubtask._id);
  else res.status(500).end();
});

app.delete('/modules/:modId/:taskId/:subtaskId', async (req, res) => {
  const taskId = req.params['taskId'];
  const subtaskId = req.params['subtaskId'];

  if (deleteSubtask(taskId, subtaskId)) res.status(204).end();
  else res.status(404).end();
});

async function deleteSubtask(taskId, subtaskId) {
  try {
    if (
      (await subtaskServices.deleteSubtask(subtaskId)) &&
      (await taskServices.deleteSubtask(taskId, subtaskId))
    )
      return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
/*
// groups
app.get('/groups', async (req, res) => {
  const name = req.query['name'];
  const admin_list = req.query['admin_list'];
  const member_list = req.query['member_list'];
  const module_list = req.query['module_list'];
  try {
    const result = await groupServices.getGroups(
      name,
      admin_list,
      member_list,
      module_list
    );
    res.send({ groups_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error ocurred in the server.');
  }
});

app.get('/groups/:id', async (req, res) => {
  const id = req.params['id'];
  let result = await groupServices.findGroupById(id);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else {
    result = { groups_list: result };
    res.send(result);
  }
});

app.delete('/groups/:id', async (req, res) => {
  const id = req.params['id'];
  if (deleteGroupById(id)) res.status(204).end();
  else res.status(404).send('Resource not found.');
});

async function deleteGroupById(id) {
  try {
    if (await groupServices.findByIdAndDelete(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
app.post('/groups', async (req, res) => {
  const group = req.body;
  const savedGroup = await groupServices.addGroup(group);
  if (savedGroup) res.status(201).send(savedGroup);
  else res.status(500).end();
});

app.patch('/groups/:id', async (req, res) => {
  const id = req.params['id'];
  const updatedGroup = req.body;
  const result = await updateGroup(id, updatedGroup);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send('Resource not found.');
  else if (result === 500)
    res.status(500).send('An error ocurred in the server.');
});

async function updateGroup(id, updatedGroup) {
  try {
    const result = await groupServices.findByIdAndUpdate(id, updatedGroup);
    if (result) return 204;
    else return 404;
  } catch (error) {
    console.log(error);
    return 500;
  }
}*/

// users
app.get('/users', async (req, res) => {
  //res.send(users); //HTTP code 200 is set by default. See an alternative below
  //res.status(200).send(users);
  const name = req.query['name'];
  const email = req.query['email'];
  const username = req.query['username'];
  const password = req.query['password'];
  const group_list = req.query['group_list'];
  try {
    const result = await userServices.getUsers(
      name,
      email,
      username,
      password,
      group_list
    );
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error ocurred in the server.');
  }
});

app.get('/users/:id', async (req, res) => {
  const id = req.params['id'];
  let result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else {
    result = { users_list: result };
    res.send(result);
  }
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params['id'];
  if (deleteUserById(id)) res.status(204).end();
  else res.status(404).send('Resource not found.');
});

async function deleteUserById(id) {
  try {
    if (await userServices.findByIdAndDelete(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
app.post('/users', async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

app.patch('/users/:id', async (req, res) => {
  const id = req.params['id'];
  const updatedUser = req.body;
  const result = await updateUser(id, updatedUser);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send('Resource not found.');
  else if (result === 500)
    res.status(500).send('An error ocurred in the server.');
});

async function updateUser(id, updatedUser) {
  try {
    const result = await userServices.findByIdAndUpdate(id, updatedUser);
    if (result) return 204;
    else return 404;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT)
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  else console.log(`REST API is listening on port: ${port}.`);
});
