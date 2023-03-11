import React from 'react';
import axios from 'axios';

import TaskForm from './taskForm';
import Modal from '../UI/Modal';

const AddTask = (props) => {
  // const [error, setError] = useState(null);

  const enterTaskHandler = async (taskData) => {
    console.log(taskData);
    try {
      const response = await axios.post(
        'http://localhost:5000/modules/' + props.modId,
        taskData
      );
      if (response.status !== 201) {
        throw new Error('Request failed!');
      }
      console.log(response);
      const createdTask = {
        id: response.data,
        title: taskData.title
      };
      console.log(createdTask);
      props.onAdded(createdTask);
    } catch (err) {
      console.log('error bruh');
      // setError(err.message || 'Something went wrong!');
    }
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
