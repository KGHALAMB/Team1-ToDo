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
      console.log(response.status);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const tasksList = props.tasksData.map((task) => (
    <li className={classes.flexItem}>
      <Card>
        <TaskItem
          id={task.id}
          key={task.id}
          title={task.title}
          description={task.description}
          category={task.category}
          duration={task.duration}
          priority={task.priority}
          removeOne={removeOneTask}
          setTask={props.setTask}
        />
      </Card>
    </li>
  ));

  return <div className={classes.flexContainer}>{tasksList}</div>;
}

export default TaskTable;
