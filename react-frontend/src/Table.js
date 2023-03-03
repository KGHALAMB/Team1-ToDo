import React from 'react';
// quick test data structure that simulates what a task would contain
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
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.title}</td>
        <td>{row.category}</td>
        <td>{row.duration}</td>
        <td>{row.status}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
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
function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody />
    </table>
  );
}

export default Table;
