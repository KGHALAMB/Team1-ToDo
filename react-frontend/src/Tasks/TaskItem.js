import React, { useState, useCallback, useEffect } from 'react';
import SubtaskTable from './Subtasks/SubtaskTable';
import AddSubtask from './Subtasks/AddSubtask';

import classes from './TaskItem.module.css';

import axios from 'axios';

const TaskItem = (props) => {
  const [subtasks, setSubtasks] = useState([]);
  const [addIsShown, setAddIsShown] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSubtasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'http://localhost:5000/modules/' + props.modId + '/' + props.id
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

  function showDel() {
    setShowDelete(!showDelete);
  }

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
      <div className={classes.taskHeader}>
        <h3 className={classes.taskTitle} onClick={() => showDel()}>
          {props.title}
        </h3>
        <div className={classes.buttons}>
          {/* <div
            className={classes.removeTask}
            onClick={() => props.removeOne(props.id)}
          >
            x
          </div> */}
          <div
            className={classes.addSubtask}
            onClick={() => setAddIsShown(true)}
          >
            +
          </div>
        </div>
      </div>
      {content}
      {showDelete && (
        <div
          className={classes.removeTask}
          onClick={() => props.removeOne(props.id)}
        >
          Delete
        </div>
      )}
    </React.Fragment>
  );
};

export default TaskItem;
