import React, { useState } from 'react';

const SignInForm = () => {
    cconst[user,setUser] = useState({
      username: '',   
      password:'',
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
      
      else if(name === 'password'){
        setTask({
          username: '',
          name: '',
          password: value,
          email:'',
        });
      }
  
    }

  const handleSubmit = (e) => {
    // TODO: 
    //how do we acutally sign in?

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

export default SignInPage;
