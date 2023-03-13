 
import React from 'react';
import axios from 'axios';
import SignUpForm from '../SignUpForm';
import Modal from '../UI/Modal';

const AddUser = (props) => {
    const enterUserHandler = async (userData) => {
      console.log(userData);
      try {
        const response = await axios.post(
          'http://localhost:5000/users',
          userData
        );
        if (response.status !== 201) {
          throw new Error('Request failed!');
        }
        console.log(response);
        const createdUser = {
          id: response.data,
          username: userData.username,
          name: userData.name,
          password: userData.password,
          email: userData.email
        };
        console.log(createdUser);
        props.onAdded(createdUser);
      } catch (err) {
        console.log(err.message || 'Something went wrong!');
      }
    };
  
    return (
      <Modal onClose={props.onClose}>
        <SignUpForm
          onClose={props.onClose}
          onAdd={enterUserHandler}
        />
      </Modal>
    );
  };
  
  export default AddUser;

