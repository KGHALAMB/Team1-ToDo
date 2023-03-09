import React, { useState } from 'react';
import axios from 'axios';

import TaskForm from './taskForm';
import Modal from '../UI/Modal';

const AddTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/modules/' + props.modId + '/tasks',
        taskData
      );
      if (response.status !== 201) {
        throw new Error('Request failed!');
      }
      console.log('yo');
      console.log(response.status);
      console.log(taskData);
      // const createdModule = { id: response.data._id, title: module.name };
      const createdTask = null;
      props.onAdded(null);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <Modal onClose={props.onClose}>
      <TaskForm
        modId={props.modId}
        onClose={props.onClose}
        onAdd={enterTaskHandler}
      />
    </Modal>
  );
};

export default AddTask;
