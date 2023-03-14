import React from 'react';
import { Link } from 'react-router-dom';

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
          <Link to={row._id}>{row.name}</Link>
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
    <div>
      <button /*onClick={() => (location.href = '/modules/form')}*/>
        Add +
      </button>
      <table>
        <TableHeader />
        <TableBody
          moduleData={props.moduleData}
          fetchAllModules={props.fetchAllModules}
          removeModule={props.removeModule}
        />
      </table>
    </div>
  );
}

export default ModuleTable;
