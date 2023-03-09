import React, { useState, useEffect, useCallback } from 'react';
import TaskTable from './taskTable';
import axios from 'axios';
import AddTask from './AddTask';
import Header from '../UI/Header';

function TaskView(props) {
  const [tasks, setTasks] = useState([]);
  const [addIsShown, setAddIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // console.log(props.modId);
    try {
      const response = await axios.get(
        'http://localhost:5000/modules/' + props.modId
      );
      console.log(response);
      setTasks(response.data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTasksHandler();
  }, [getTasksHandler]);

  const taskAddHandler = (task) => {
    setTasks([...tasks, task]);
    setAddIsShown(false);
  };

  const showAddHandler = () => {
    setAddIsShown(true);
  };

  const hideAddHandler = () => {
    setAddIsShown(false);
  };

  let content = <p>Found no tasks.</p>;

  if (tasks.length) {
    content = (
      <React.Fragment>
        <TaskTable
          back={props.back}
          tasksData={tasks}
          // removeTask={removeOneTask}
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

  if (tasks)
    return (
      <React.Fragment>
        {addIsShown && (
          <AddTask
            onAdded={taskAddHandler}
            onClose={hideAddHandler}
            modId={props.modId}
          />
        )}
        <Header onAdd={showAddHandler} back={props.back} title="Add Task" />
        <section>{content}</section>
      </React.Fragment>
    );
}

export default TaskView;
