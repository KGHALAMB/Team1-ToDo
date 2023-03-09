import React from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import TaskItem from './TaskItem';

import classes from './taskTable.module.css';

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

function TaskTable(props) {
  function removeOneTask(mId) {
    makeDeleteCallModule(mId).then((result) => {
      if (result.status === 204) {
        const updated = props.moduleData.filter((module, i) => {
          return module.id !== mId;
        });
        props.setMod(updated);
      }
    });
  }

  async function makeDeleteCallModule(id) {
    try {
      const response = await axios.delete(
        'http://localhost:5000/modules/' + id
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const tasksList = props.tasksData.map((task) => (
    <TaskItem
      id={task.id}
      key={task.id}
      title={task.title}
      description={task.description}
      categorty={task.categorty}
      duration={task.duration}
      status={task.status}
      fetchAllTasks={task.fetchAllTasks}
      removeOne={removeOneTask}
      setTask={props.setTask}
    />
  ));

  return (
    <React.Fragment>
      <section className={classes.tasks}>
        <Card>
          <ul>{tasksList}</ul>
        </Card>
      </section>
    </React.Fragment>
  );
}

export default TaskTable;
