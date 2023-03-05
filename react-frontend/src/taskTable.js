import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th>Category</th>
        <th>Time</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.taskData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.title}</td>
        <td>{row.category}</td>
        <td>{row.duration}</td>
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

function TaskTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody taskData={props.taskData} removeTask={props.removeTask} />
    </table>
  );
}

export default TaskTable;
