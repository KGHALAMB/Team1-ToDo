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
        'https://team1-todo2.azurewebsites.net/modules/' + props.modId + '/' + id
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const colOne = props.tasksData.filter((task, index) => {
    return index % 3 === 0;
  });

  const colTwo = props.tasksData.filter((task, index) => {
    return (index + 2) % 3 === 0;
  });

  const colThree = props.tasksData.filter((task, index) => {
    return (index + 1) % 3 === 0;
  });

  const taskColumnOne = colOne.map((task, index) => (
    <li className={classes.flexItem} key={task.id}>
      <Card color={'taskColor'}>
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

  const taskColumnTwo = colTwo.map((task, index) => (
    <li className={classes.flexItem} key={task.id}>
      <Card color={'taskColor'}>
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

  const taskColumnThree = colThree.map((task, index) => (
    <li className={classes.flexItem} key={task.id}>
      <Card color={'taskColor'}>
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

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexColumn}>{taskColumnOne}</div>
      <div className={classes.flexColumn}>{taskColumnTwo}</div>
      <div className={classes.flexColumn}>{taskColumnThree}</div>
    </div>
  );
}

export default TaskTable;
