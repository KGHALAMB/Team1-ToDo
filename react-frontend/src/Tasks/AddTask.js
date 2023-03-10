import React from 'react';
import axios from 'axios';

import TaskForm from './taskForm';
import Modal from '../UI/Modal';

const AddTask = (props) => {
  // const [error, setError] = useState(null);

  const enterTaskHandler = async (taskData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/modules/' + props.modId,
        taskData
      );
      if (response.status !== 201) {
        throw new Error('Request failed!');
      }

      const createdTask = {
        id: response.data.id,
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        duration: taskData.duration,
        priority: taskData.priority
      };
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
