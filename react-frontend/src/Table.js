import React from "react";
const data = [
  { task: "walk the dog", category: "home", time: "20 mins" },
  { task: "307 lab", category: "school", time: "1 hour" }
];
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th>Category</th>
        <th>time</th>
      </tr>
    </thead>
  );
}

function TableBody() {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.task}</td>
        <td>{row.category}</td>
        <td>{row.time}</td>
        <td>
          <button>Delete</button>
          <button>Mark As Done</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;
