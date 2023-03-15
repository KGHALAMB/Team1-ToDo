import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SignUpForm from './SignUpForm';
import Card from '../UI/Card';

const AddUser = (props) => {
  const [usernameList, setUsernameList] = useState();

  const enterUserHandler = async (userData) => {
    try {
      const response = await axios.post(
        'https://team1-todo2.azurewebsites.net/users',
        userData
      );

      const createdUser = {
        id: response.data._id,
        username: userData.username,
        name: userData.name,
        password: userData.password,
        email: userData.email
      };
      // console.log(createdUser);
      props.valid(createdUser);
      // props.onAdded(createdUser);
    } catch (err) {
      console.log(err.message || 'Something went wrong!');
    }
  };

  const getUsernames = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://team1-todo2.azurewebsites.net/users/usernames'
      );

      if (response.status === 404) {
        throw new Error('Could not retrieve usernames list');
      }
      setUsernameList(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    getUsernames();
  }, [getUsernames]);

  return (
    <Card color={'signInUpColor'}>
      <SignUpForm
        onClose={props.onClose}
        onAdd={enterUserHandler}
        usernames={usernameList}
      />
    </Card>
  );
};

export default AddUser;
