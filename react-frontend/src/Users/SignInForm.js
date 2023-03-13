import React, { useState } from 'react';

const SignInForm = (props) => {
    cconst[user,setUser] = useState({
      username: '',   
      password:'',
    });   

    function handleChange(e){
      const { name, value } = e.target;
      if (name === 'username'){
        setUser({
          username: value,
          password:'',
        
        });}
      
      else if(name === 'password'){
        setUser({
          username: '',
          password: value,
        });
      }
  
    }

  const handleSubmit = (e) => {
    props.onAdd(user)

  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="username" id="username" value={username} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handleChange} />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default SignInForm;
