import React from "react";
// quick test data structure that simulates what a task would contain
const data = [
  {
    title: "307 Lab",
    description: "do the lab!",
    category: "School",
    duration: "1 hour", //may need to change to number?
    priority: "1", //^
    status: "not done",
  },
  {
    title: "Walk The Dog",
    description: "take the dog for a walk at the park",
    category: "Home",
    duration: "30 mins", //may need to change to number?
    status: "done",
  },
];
// top of the table
// 4 columns per table (Task, Category, Time, Complete)
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th>Category</th>
        <th>Time</th>
        <th>Complete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.title}</td>
        <td>{row.category}</td>
        <td>{row.duration}</td>
        <td>{row.status}</td>
        <td>
          <button onClick={() => props.removeTask(index)}>Delete</button>
        </td>
        <td>
          <button>Mark As Done</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

//Assembly of the table with header and body
function TaskTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody taskData={props.taskData} removeTask={props.removeTask} />
    </table>
  );
}

export default TaskTable;
