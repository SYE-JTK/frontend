import React, { useState } from 'react';

const InputField = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  return (
    <div>
      <h1>Hello, and welcome</h1>

      <div>Your current user name is: { username }</div> <br/>
      
      <div>Your password is: { password }</div> <br/> <br/>

      <form>
        <label>
          Enter your username:   
          <input type='text' placeholder='username' onChange={handleUsernameChange} />
        </label> <br/> <br/>
        <label>
          Enter your password:  
          <input type='text' placeholder='password' onChange={handlePasswordChange}/>
        </label>
      </form>
    </div>
  );
}

export default InputField;
