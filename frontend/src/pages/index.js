import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await ('/api/login', { username, password });
      if (response.ok) {
        // Handle successful login
        // localStorage.setItem('token', response.data.token);
        // Redirect to the home page
        window.location.href = '/api/workouts';
      } else {
        setErrorMessage(response.data.message);
      }
      console.log('Login attempt with:', username, password);
    } catch (error) {
      setErrorMessage('An error occurred during login');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;


