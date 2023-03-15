import React, { useState } from 'react';

const SignInForm = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'username') {
      setUser({
        username: value,
        password: user['password']
      });
    } else if (name === 'password') {
      setUser({
        username: user['username'],
        password: value
      });
    }
  }

  function submitForm() {
    props.onSub(user);
    setUser({
      username: '',
      password: ''
    });
  }

  return (
    <form>
      <label htmlFor="username">Username:</label>
      <div>
        <input
          type="text"
          name="username"
          _id="username"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="password">Password:</label>
      <div>
        <input
          type="password"
          name="password"
          _id="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      {props.auth && <p>Username or password is incorrect</p>}
      <input type="button" value="Log In" onClick={submitForm} />
    </form>
  );
};

export default SignInForm;
