import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Module</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.moduleData.map((row, index) => {
    return (
      <tr key={index}>
        <td>
          <button onClick={() => props.fetchAllTasks(index)}>{row.name}</button>
        </td>
        <td>
          <button onClick={() => props.removeModule(index)}>Delete</button>
        </td>
        <td>
          <button>Archive</button>
        </td>
        <td>
          <button>Share</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function ModuleTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        moduleData={props.moduleData}
        fetchAllTasks={props.fetchAllTasks}
        removeModule={props.removeModule}
      />
    </table>
  );
}

export default ModuleTable;
