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
        'https://team1-todo2.azurewebsites.net/modules/' +
          props.modId +
          '/' +
          props.taskId +
          '/' +
          subtaskId
      );
      return response;
    } catch (error) {
      return false;
    }
  }

  const subtaskList = props.subtaskData.map((subtask) => (
    <div key={subtask.id}>
      <Card color={'subtaskColor'}>
        <SubtaskItem
          id={subtask.id}
          title={subtask.title}
          description={subtask.description}
          date={subtask.date}
          priority={subtask.priority}
          steps={subtask.steps}
          removeOne={removeOneSubtask}
          setTask={props.setTask}
        />
      </Card>
    </div>
  ));

  return <div>{subtaskList}</div>;
}

export default SubtaskTable;
