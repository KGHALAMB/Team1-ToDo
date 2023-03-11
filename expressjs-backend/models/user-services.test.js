const groupServices = require("./group-services.js");
const groupModel = require("./group");

test("finding a user by id", async () => {
  const user = {
    name: "Bob",
    email: [],
    username: [],
    password: [],
    module_list: [],
  };
  let target = new userModel(user);
  // userModel.deleteMany({});
  await userServices.addGroup(group);
  let result = await userServices.findUserById(target["_id"]);
  expect(result["_id"]).toEqual(target["_id"]);
});

test("finding a user by name", async () => {
  const user = {
    name: "Bob",
    email: [],
    username: [],
    password: [],
    module_list: [],
  };
  let target = new userModel(user);
  // userModel.deleteMany({});
  await userServices.addGroup(user);
  let result = await userServices.findUserByName(target["name"]);
  expect(result["name"]).toEqual(target["name"]);
});

test("finding a user by email", async () => {
  const user = {
    name: "Bob",
    email: "bob@gmail.com",
    username: "",
    password: "",
    module_list: [],
  };
  let target = new userModel(user);
  // userModel.deleteMany({});
  await userServices.addUser(user);
  let result = await userServices.findUserByEmail(target["email"]);
  expect(result["email"]).toEqual(target["email"]);
});

test("finding a user by username", async () => {
  const user = {
    name: "Bob",
    email: "bob@gmail.com",
    username: "bob123",
    password: "",
    module_list: [],
  };
  let target = new userModel(user);
  // userModel.deleteMany({});
  await userServices.addUser(user);
  let result = await userServices.findUserByUserName(target["username"]);
  expect(result["username"]).toEqual(target["username"]);
});

test("finding a group by module list", async () => {
  const user = {
    name: "Bob",
    email: [],
    username: [],
    password: [],
    module_list: [],
  };
  let target = new userModel(user);
  // userModel.deleteMany({});
  await userServices.addUser(user);
  let result = await userServices.findUserByName(target["module_list"]);
  expect(result["module_list"]).toEqual(target["module_list"]);
});
