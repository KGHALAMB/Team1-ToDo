import React, { useState } from 'react';

const SignUpForm = (props) => {
    const[user,setUser] = useState({
      username: '',
      name: '',
      password:'',
      email:''
    });    
    
  function handleChange(e){
    const { name, value } = e.target;
    if (name === 'username'){
      setTask({
        username: value,
        name: '',
        password:'',
        email:'',
      });}
    else if(name === 'name'){
      setTask({
        username: '',
        name: value,
        password:'',
        email:'',name
      });
    }
    else if(name === 'password'){
      setTask({
        username: '',
        name: '',
        password: value,
        email:'',
      });
    }
      else if(name === 'email'){
        setTask({
          username: '',
          name: '',
          password: '',
          email: value,
        });
    }

  }
  const handleSubmit = (e) => {
    props.onAdd(user)
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleChange} />
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
