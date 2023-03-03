import React, { useState } from 'react';

const signin = () => {
    const[username, setUsername] = useState(''); 
    const[password, setPassword] = useState(''); //need setUsername and setpassword

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
        <input type="username" id="username" value={username} onChange={handleUsernameChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;
