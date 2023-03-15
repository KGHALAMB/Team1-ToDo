import React from 'react';
import { useParams } from 'react-router-dom';
// quick test data structure that simulates what a task would contain
const data = [
  {
    title: '307 Lab',
    description: 'do the lab!',
    category: 'School',
    duration: '1 hour', //may need to change to number?
    priority: '1', //^
    status: 'not done'
  },
  {
    title: 'Walk The Dog',
    description: 'take the dog for a walk at the park',
    category: 'Home',
    duration: '30 mins', //may need to change to number?
    status: 'done'
  }
];

// top of the table
// 4 columns per table (Task, Category, Time, Complete)
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Task</th>
        {/*<th>Category</th>*/}
        <th>Time</th>
        <th>Complete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  console.log(props.taskData);
  const rows = props.taskData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.title}</td>
        {/*<td>{row.category}</td>*/}
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
  const params = useParams();
  console.log(params.id);
  return (
    <div>
      <button
        onClick={() => (location.href = '/modules/' + params.id + '/form')}
      >
        Add +
      </button>
      <table>
        <TableHeader />
        <TableBody taskData={props.taskData} removeTask={props.removeTask} />
      </table>
    </div>
  );
}

export default TaskTable;
