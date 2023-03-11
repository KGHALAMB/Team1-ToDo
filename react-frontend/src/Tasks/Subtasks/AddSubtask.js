import React from 'react';
import axios from 'axios';

import SubtaskForm from './SubtaskForm';
import Modal from '../../UI/Modal';

const AddSubtask = (props) => {
  const enterSubtaskHandler = async (subtaskData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/modules/' + props.modId + '/' + props.taskId,
        subtaskData
      );
      if (response.status !== 201) {
        throw new Error('Request failed!');
      }
      const createdSubtask = {
        id: response.data.id,
        title: subtaskData.title,
        description: subtaskData.description,
        category: subtaskData.category,
        date: subtaskData.date,
        priority: subtaskData.priority
      };
      props.onAdded(createdSubtask);
    } catch (err) {
      console.log(err.message || 'Something went wrong!');
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <SubtaskForm
        modId={props.modId}
        onClose={props.onClose}
        onAdd={enterSubtaskHandler}
      />
    </Modal>
  );
};

export default AddSubtask;
