const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// Add mongdb task services
const taskServices = require("./models/task-services");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(tasks_list);
});

app.get("/tasks", async (req, res) => {
  const title = req.query["title"];
  const description = req.query["description"];
  const category = req.query["category"];
  const duration = req.query["duration"];
  const priority = req.query["priority"];

  if (title === undefined && description === undefined && category == undefined && duration == undefined && priority == undefined) {
    try {
      const tasks_from_db = await taskServices.getTasks();
      res.send({ tasks_list: tasks_from_db });
    } catch (error) {
      console.log("Mongoose error: " + error);
      res.status(500).send("An error ocurred in the server.");
    }
  } else if (title && description === undefined && category == undefined && duration == undefined && priority == undefined) {
    let result = await taskServices.findTaskByTitle(title);
    result = { tasks_list: result };
    res.send(result);
  } else if (title === undefined && description && category == undefined && duration == undefined && priority == undefined) {
    let result = await taskServices.findTaskByDescription(description);
    result = { tasks_list: result };
    res.send(result);
  } else if (title === undefined && description == undefined && category && duration == undefined && priority == undefined) {
    let result = await taskServices.findTaskByCategory(category);
    result = { tasks_list: result };
    res.send(result);
  } else if (title === undefined && description == undefined && category == undefined && duration && priority == undefined) {
    let result = await taskServices.findTaskByDuration(duration);
    result = { tasks_list: result };
    res.send(result);
  } else if (title === undefined && description == undefined && category == undefined && duration == undefined && priority) {
    let result = await taskServices.findTaskByPriority(priority);
    result = { tasks_list: result };
    res.send(result);
  } else {
    let result = await taskServices.findTask(title, description, category, duration, priority);
    result = { tasks_list: result };
    res.send(result);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await taskServices.findTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    result = { tasks_list: result };
    res.send(result);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const id = req.params["_id"];
  console.log(req.params.id);
  if (deleteTaskById(id)) res.status(204).end();
  else res.status(404).send("Resource not found.");
});

async function deleteTaskById(id) {
  try {
    if (await taskServices.deleteTask(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
app.post("/tasks", async (req, res) => {
  const task = req.body;
  const savedTask = await taskServices.addTask(task);
  if (savedTask) res.status(201).send(savedTask);
  else res.status(500).end();
});

app.patch("/tasks/:id", async (req, res) => {
  const id = req.params["id"];
  const updatedTask = req.body;
  const result = await updateTask(id, updatedTask);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send("Resource not found.");
  else if (result === 500)
    res.status(500).send("An error ocurred in the server.");
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

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT)
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  else console.log(`REST API is listening on port: ${port}.`);
});