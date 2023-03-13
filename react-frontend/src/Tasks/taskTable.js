import React from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import TaskItem from './TaskItem';

import classes from './taskTable.module.css';

function TaskTable(props) {
  function removeOneTask(taskId) {
    makeDeleteCallModule(taskId).then((result) => {
      if (result.status === 204) {
        const updated = props.tasksData.filter((module, i) => {
          return module.id !== taskId;
        });
        props.setTask(updated);
      }
    });
  }

  async function makeDeleteCallModule(id) {
    try {
      const response = await axios.delete(
        'http://localhost:5000/modules/' + props.modId + '/' + id
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  const tasksList = props.tasksData.map((task) => (
    <li className={classes.flexItem} key={task.id}>
      <Card>
        <TaskItem
          id={task.id}
          title={task.title}
          removeOne={removeOneTask}
          setTask={props.setTask}
          modId={props.modId}
        />
      </Card>
    </li>
  ));

  return <div className={classes.flexContainer}>{tasksList}</div>;
}

export default TaskTable;
