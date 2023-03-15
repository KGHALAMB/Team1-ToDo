import React, { useState } from 'react';
import Card from '../UI/Card';
import axios from 'axios';
import SignInForm from './SignInForm';

function ValidateUser(props) {
  const [authFail, setAuthFail] = useState(false);
  async function enterUserHandler(userData) {
    try {
      const response = await axios.get(
        'http://team1-todo2.azurewebsites.net/users/' +
          userData.username +
          '/' +
          userData.password
      );
      if (response.status !== 200 || response.data.length === 0) {
        setAuthFail(true);
        throw new Error('Invalid username or password');
      }
      setAuthFail(false);
      props.valid(response.data);
    } catch (err) {
      setAuthFail(true);
    }
  }

  return (
    <Card color={'signInUpColor'}>
      <SignInForm onSub={enterUserHandler} auth={authFail} />
    </Card>
  );
}

export default ValidateUser;
