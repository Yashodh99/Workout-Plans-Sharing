import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password
      });
      const loggedInUser = response.data;
      console.log('Logged in user:', loggedInUser);
      navigate('/exercises');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error logging in:', error);
    }
  };

  const handleGoogleLoginSuccess = async (googleData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/google-login', {
        token: googleData.tokenId
      });
      const loggedInUser = response.data;
      console.log('Logged in user:', loggedInUser);
      alert('Login successful');
      navigate('/exercises');
    } catch (error) {
      setError('Failed to log in with Google');
      console.error('Error logging in with Google:', error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    setError('Failed to log in with Google');
    console.error('Error logging in with Google:', error);
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Log Into Your Account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="loginEmail">Email:</label>
          <input
            type="email"
            id="loginEmail"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            id="loginPassword"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Log In</button>
        {error && <div className="error-message">{error}</div>}
        <div className="google-login">
          <GoogleLogin
            clientId=""
            buttonText="Continue with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;


