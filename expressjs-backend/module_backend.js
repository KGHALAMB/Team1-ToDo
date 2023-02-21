const express = require("express");
const mongoose = require("mongoose");

// Add mongdb module services
const moduleServices = require("./models/module-services");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/modules", async (req, res) => {
  //res.send(modules); //HTTP code 200 is set by default. See an alternative below
  //res.status(200).send(modules);
  const name = req.query["name"];
  const task_list = req.query["task_list"];
  const user_list = req.query["user_list"];
  try {
    const result = await moduleServices.getModules(name, task_list, user_list);
    res.send({ modules_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/modules/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await moduleServices.findModuleById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    result = { modules_list: result };
    res.send(result);
  }
});

app.delete("/modules/:id", async (req, res) => {
  const id = req.params["id"];
  if (deleteModuleById(id)) res.status(204).end();
  else res.status(404).send("Resource not found.");
});

async function deleteModuleById(id) {
  try {
    if (await moduleServices.findByIdAndDelete(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
app.post("/modules", async (req, res) => {
  const module = req.body;
  const savedModule = await moduleServices.addModule(module);
  if (savedModule) res.status(201).send(savedModule);
  else res.status(500).end();
});

app.patch("/modules/:id", async (req, res) => {
  const id = req.params["id"];
  const updatedModule = req.body;
  const result = await updateModule(id, updatedModule);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send("Resource not found.");
  else if (result === 500)
    res.status(500).send("An error ocurred in the server.");
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

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT)
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  else console.log(`REST API is listening on port: ${port}.`);
});