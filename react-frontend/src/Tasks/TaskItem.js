import React, { useState, useCallback, useEffect } from 'react';
import SubtaskTable from './Subtasks/SubtaskTable';
import AddSubtask from './Subtasks/AddSubtask';

import axios from 'axios';

const TaskItem = (props) => {
  const [subtasks, setSubtasks] = useState([]);
  const [addIsShown, setAddIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSubtasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://team1-todo2.azurewebsites.net/modules/' + props.modId + '/' + props.id
      );
      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }
      const data = await response.data;
      const loadedSubtasks = [];

      for (const index in data) {
        loadedSubtasks.push({
          id: data[index]._id,
          title: data[index].title,
          date: data[index].date,
          priority: data[index].priority,
          description: data[index].description,
          steps: data[index].steps
        });
      }

      setSubtasks(loadedSubtasks);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.modId, props.id]);

  useEffect(() => {
    getSubtasksHandler();
  }, [getSubtasksHandler]);

  let content = null;

  if (subtasks.length) {
    content = (
      <React.Fragment>
        <SubtaskTable
          subtaskData={subtasks}
          modId={props.modId}
          taskId={props.id}
          setSubtask={setSubtasks}
        />
      </React.Fragment>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const subtaskAddHandler = (subtask) => {
    setSubtasks([...subtasks, subtask]);
    setAddIsShown(false);
  };

  const hideAddHandler = () => {
    setAddIsShown(false);
  };

  return (
    <React.Fragment>
      {addIsShown && (
        <AddSubtask
          onAdded={subtaskAddHandler}
          onClose={hideAddHandler}
          modId={props.modId}
          taskId={props.id}
        />
      )}
      <h3>{props.title}</h3>
      {content}
      <button onClick={() => props.removeOne(props.id)}>Delete</button>
      <button onClick={() => setAddIsShown(true)}>Add Subtask</button>
    </React.Fragment>
  );
};

export default TaskItem;
