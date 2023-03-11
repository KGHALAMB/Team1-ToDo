import React from 'react';
import axios from 'axios';
import Card from '../../UI/Card';
import SubtaskItem from './SubtaskItem';

// import classes from '../taskTable.module.css';

function SubtaskTable(props) {
  function removeOneSubtask(subtaskId) {
    console.log(subtaskId);
    makeDeleteCallModule(subtaskId).then((result) => {
      if (result.status === 204) {
        const updated = props.subtaskData.filter((subtask, i) => {
          console.log(subtask.id);
          return subtask.id !== subtaskId;
        });
        console.log(updated);
        props.setSubtask(updated);
      }
    });
  }

  async function makeDeleteCallModule(subtaskId) {
    console.log(subtaskId);
    try {
      const response = await axios.delete(
        'http://localhost:5000/modules/' +
          props.modId +
          '/' +
          props.taskId +
          '/' +
          subtaskId
      );
      console.log(response.status);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const subtaskList = props.subtaskData.map((subtask) => (
    <li>
      <Card>
        <SubtaskItem
          id={subtask.id}
          key={subtask.id}
          title={subtask.title}
          description={subtask.description}
          date={subtask.date}
          priority={subtask.priority}
          removeOne={removeOneSubtask}
          setTask={props.setTask}
        />
      </Card>
    </li>
  ));

  return <div>{subtaskList}</div>;
}

export default SubtaskTable;
