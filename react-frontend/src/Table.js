import React from "react";
const data = [
  {
    title: "307 Lab",
    description: "do the lab!",
    category: "School",
    duration: "1 hour", //may need to change to number?
    priority: "1" //^
  },
  {
    title: "Walk The Dog",
    description: "take the dog for a walk at the park",
    category: "Home",
    duration: "30 mins", //may need to change to number?
    priority: "2" //^
  }
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
        <td>{row.title}</td>
        <td>{row.category}</td>
        <td>{row.duration}</td>
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
