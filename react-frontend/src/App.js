/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ModView from './Modules/modView';
import TaskView from './Tasks/taskView';
// import SignUpView from './Users/SignUpView';
// import SignInView from './Users/SignInView';
import AddUser from './Users/AddUser';
import ValidateUser from './Users/ValidateUser';
import Header from './UI/Header';

function MyApp() {
  const [moduleId, setModId] = useState([]);
  const [isModView, setIsModView] = useState(true);
  const [isTaskView, setIsTaskView] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const [isSignUpView, setIsSignUpView] = useState(true);
  const [isSignInView, setIsSignInView] = useState(false);
  const [userId, setUserId] = useState('');
  console.log();

  function handleTaskView(modId) {
    setIsModView(false);
    setIsTaskView(true);
    setModId(modId);
  }

  function backFromTaskList() {
    setIsModView(true);
    setIsTaskView(false);
  }

  function changeToSignInView() {
    setIsSignUpView(false);
    setIsSignInView(true);
  }

  function changeToSignUpView() {
    setIsSignUpView(true);
    setIsSignInView(false);
  }

  function validated(userId) {
    setUserId(userId);
    setUserValidated(true);
  }

  let content;

  if (!userValidated) {
    if (isSignUpView) {
      content = (
        <React.Fragment>
          <Header onAdd={changeToSignInView} title={'Sign In'} />
          <AddUser valid={validated} />
        </React.Fragment>
      );
    } else if (isSignInView) {
      content = (
        <React.Fragment>
          <Header onAdd={changeToSignUpView} title={'Sign Up'} />
          <ValidateUser valid={validated} />
        </React.Fragment>
      );
    }
  } else if (userValidated) {
    if (isModView) {
      // console.log('bruh');
      content = <ModView taskView={handleTaskView} />;
    } else if (isTaskView) {
      content = <TaskView modId={moduleId} back={backFromTaskList} />;
    }
  }

  return (
    <React.Fragment>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default MyApp;
