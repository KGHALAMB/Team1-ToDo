const groupServices = require("./group-services.js");
const groupModel = require("./group");

test("finding a group by id", async () => {
  const group = {
    name: "a",
    admin_list: [],
    member_list: [],
    module_list: [],
  };
  let target = new groupModel(group);
  // groupModel.deleteMany({});
  await groupServices.addGroup(group);
  let result = await groupServices.findGroupById(target["_id"]);
  expect(result["_id"]).toEqual(target["_id"]);
});

test("finding a group by name", async () => {
  const group = {
    name: "a",
    admin_list: [],
    member_list: [],
    module_list: [],
  };
  let target = new groupModel(group);
  // groupModel.deleteMany({});
  await groupServices.addGroup(group);
  let result = await groupServices.findGroupByName(target["name"]);
  expect(result["name"]).toEqual(target["name"]);
});

test("finding a group by admin list", async () => {
  const group = {
    name: "a",
    admin_list: [],
    member_list: [],
    module_list: [],
  };
  let target = new groupModel(group);
  // groupModel.deleteMany({});
  await groupServices.addGroup(group);
  let result = await groupServices.findGroupByName(target["admin_list"]);
  expect(result["admin_list"]).toEqual(target["admin_list"]);
});

test("finding a group by member list", async () => {
  const group = {
    name: "a",
    admin_list: [],
    member_list: [],
    module_list: [],
  };
  let target = new groupModel(group);
  // groupModel.deleteMany({});
  await groupServices.addGroup(group);
  let result = await groupServices.findGroupByName(target["member_list"]);
  expect(result["member_list"]).toEqual(target["member_list"]);
});

test("finding a group by module_list", async () => {
  const group = {
    name: "a",
    admin_list: [],
    member_list: [],
    module_list: [],
  };
  let target = new groupModel(group);
  // groupModel.deleteMany({});
  await groupServices.addGroup(group);
  let result = await groupServices.findGroupByName(target["module_list"]);
  expect(result["module_list"]).toEqual(target["module_list"]);
});
