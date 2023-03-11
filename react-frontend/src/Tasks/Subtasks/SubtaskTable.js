import React from 'react';
import axios from 'axios';
import Card from '../../UI/Card';
import SubtaskItem from './SubtaskItem';

function SubtaskTable(props) {
  function removeOneSubtask(subtaskId) {
    makeDeleteCallModule(subtaskId).then((result) => {
      if (result.status === 204) {
        const updated = props.subtaskData.filter((subtask, i) => {
          return subtask.id !== subtaskId;
        });
        props.setSubtask(updated);
      }
    });
  }

  async function makeDeleteCallModule(subtaskId) {
    try {
      const response = await axios.delete(
        'http://localhost:5000/modules/' +
          props.modId +
          '/' +
          props.taskId +
          '/' +
          subtaskId
      );
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
