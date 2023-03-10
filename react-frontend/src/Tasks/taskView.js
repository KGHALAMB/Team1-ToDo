import React, { useState, useEffect, useCallback } from 'react';
import TaskTable from './taskTable';
import Header from '../UI/Header';
import AddTask from './AddTask';
import axios from 'axios';

function TaskView(props) {
  const [tasks, setTasks] = useState([]);
  const [addIsShown, setAddIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'http://localhost:5000/modules/' + props.modId
      );
      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }
      const data = await response.data;
      console.log(data);
      const loadedTasks = [];

      for (const index in data) {
        loadedTasks.push({
          id: data[index]._id,
          title: data[index].title,
          description: data[index].description,
          category: data[index].category,
          duration: data[index].duration,
          priority: data[index].priority
        });
      }

      console.log(loadedTasks);

      setTasks(loadedTasks);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.modId]);

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

  let content = <p>No tasks found</p>;

  if (tasks.length > 0) {
    content = (
      <React.Fragment>
        <TaskTable
          back={props.back}
          tasksData={tasks}
          modId={props.modId}
          setTask={setTasks}
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

  if (true)
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
        {content}
      </React.Fragment>
    );
}

export default TaskView;
