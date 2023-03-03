import React, { useState } from 'react';

const SignUpPage = () => {

    const[username, setUsername] = useState(''); 
    const[password, setPassword] = useState(''); 
    const[name, setName] = useState(''); 
    const[email, setEmail] = useState(''); 
    

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    // TODO: 
    //how do we acutally sign up?
    
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
