const express = require("express");
const mongoose = require("mongoose");

// Add mongdb group services
const groupServices = require("./models/group-services");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/groups", async (req, res) => {
  //res.send(groups); //HTTP code 200 is set by default. See an alternative below
  //res.status(200).send(groups);
  const name = req.query["name"];
  const admin_list = req.query["admin_list"];
  const member_list = req.query["member_list"];
  const module_list = req.query["module_list"];
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
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/groups/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await groupServices.findGroupById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    result = { groups_list: result };
    res.send(result);
  }
});

app.delete("/groups/:id", async (req, res) => {
  const id = req.params["id"];
  if (deleteGroupById(id)) res.status(204).end();
  else res.status(404).send("Resource not found.");
});

async function deleteGroupById(id) {
  try {
    if (await groupServices.findByIdAndDelete(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
app.post("/groups", async (req, res) => {
  const group = req.body;
  const savedGroup = await groupServices.addGroup(group);
  if (savedGroup) res.status(201).send(savedGroup);
  else res.status(500).end();
});

app.patch("/groups/:id", async (req, res) => {
  const id = req.params["id"];
  const updatedGroup = req.body;
  const result = await updateGroup(id, updatedGroup);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send("Resource not found.");
  else if (result === 500)
    res.status(500).send("An error ocurred in the server.");
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
}

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT)
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  else console.log(`REST API is listening on port: ${port}.`);
});
