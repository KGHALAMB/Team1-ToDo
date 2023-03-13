 
import React from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';
import Modal from '../UI/Modal';

const ValidateUser = (props) => {
    const enterUserHandler = async (userData) => {
      try {
        const response = await axios.get(
            `http://localhost:5000/users?username=${userData.username}&password=${userData.password}`
        );
        if (response.status !== 200 || response.data.length === 0) {
            throw new Error('Invalid username or password');
        }
        const existingUser = response.data[0];
        props.onAdded(existingUser);
      } catch (err) {
        console.log(err.message || 'Something went wrong!');
      }
    };
  
    return (
      <Modal onClose={props.onClose}>
        <SignInForm
          onClose={props.onClose}
          onAdd={enterUserHandler}
        />
      </Modal>
    );
  };
  
  export default ValidateUser;

