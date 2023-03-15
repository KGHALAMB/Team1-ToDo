import React, { useState } from 'react';

const SignUpForm = (props) => {
  const [user, setUser] = useState({
    username: '',
    name: '',
    password: '',
    email: ''
  });
  const [usernameTaken, setUsernameTaken] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'username') {
      if (props.usernames.includes(value.toString())) {
        setUsernameTaken(true);
      } else {
        setUsernameTaken(false);
      }
      setUser({
        username: value,
        name: user['name'],
        password: user['password'],
        email: user['email']
      });
    } else if (name === 'name') {
      setUser({
        username: user['username'],
        name: value,
        password: user['password'],
        email: user['email']
      });
    } else if (name === 'password') {
      setUser({
        username: user['username'],
        name: user['name'],
        password: value,
        email: user['email']
      });
    } else if (name === 'email') {
      setUser({
        username: user['username'],
        name: user['name'],
        password: user['password'],
        email: value
      });
    }
  }
  function submitForm() {
    if (!usernameTaken) {
      props.onAdd(user);
      setUser({
        username: '',
        name: '',
        password: '',
        email: ''
      });
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          _id="name"
          value={user.name}
          onChange={handleChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          _id="username"
          value={user.username}
          onChange={handleChange}
        />
        {usernameTaken && <p color="red">This username is already taken</p>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          _id="email"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          _id="password"
          value={user.password}
          onChange={handleChange}
        />
        <input type="button" value="Sign Up" onClick={submitForm} />
      </form>
    </div>
  );
};

export default SignUpForm;
