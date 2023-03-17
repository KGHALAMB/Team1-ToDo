# Team1-ToDo

Project blurb:
This project encapsulates this teams work on the To Do List project assigned to them for CSC 307.  This application allows users to log into an account, or create a new account.  The user will then be lead to a page in which they can create, delete or remove modules. Within each module, there are tasks that can be viewed in their own page.  In this taskview, the user can create subtasks for the tasks that display criteria like, description, due date and priority.  

The Website can be accessed through this link: https://orange-island-0045eaf1e.2.azurestaticapps.net/

UI Prototype (Last updated Feb 22nd): 
https://www.figma.com/file/DLfvaB6MmPHu5SqbbkLfY9/Untitled?node-id=2%3A224


Development environment: 
* IDE: VSCODE
* Extensions: ESLint and Prettier
* Frontend: Reactjs
* Backend: Nodejs with expressjs framework
* Cloud Database: MongoDB Atlas - You must gain access to the database through an administrator and set up your local .env file accordingly
* Unit Tests: Jest
* Linter: Prettier formatting with ESLint (AirBnB styleguide) https://airbnb.io/javascript/react/
* Make sure to run npm install

UML Diagram(Last Updated Mar 6th): https://drive.google.com/file/d/1-agvxAlUC0QfMvS3_2xPoUauRNKNBA8V/view

Code Coverage Report:
//Start
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |     100 |      100 |     100 |     100 |                   
 module-services.js    |     100 |      100 |     100 |     100 |                   
 module.js             |     100 |      100 |     100 |     100 |                   
 mongoose.db.config.js |     100 |      100 |     100 |     100 |                   
 subtask-services.js   |     100 |      100 |     100 |     100 |                   
 subtask.js            |     100 |      100 |     100 |     100 |                   
 task-services.js      |     100 |      100 |     100 |     100 |                   
 task.js               |     100 |      100 |     100 |     100 |                   
 user-services.js      |     100 |      100 |     100 |     100 |                   
 user.js               |     100 |      100 |     100 |     100 |                   
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       43 passed, 43 total
Snapshots:   0 total
Time:        15.36 s
Ran all test suites.
//End
