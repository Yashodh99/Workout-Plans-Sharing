import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import './SignupPage.css'; 

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessages({
        firstName: firstName ? '' : 'Please enter first name',
        lastName: lastName ? '' : 'Please enter last name',
        email: email ? '' : 'Please enter email',
        password: password ? '' : 'Please enter password',
        confirmPassword: confirmPassword ? '' : 'Please confirm password'
      });
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessages({
        ...errorMessages,
        confirmPassword: 'Passwords do not match'
      });
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/users/signup', {
        firstName,
        lastName,
        email,
        password
      });
      clearForm();
      alert('Sign up successful');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessages({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleGoogleSignupSuccess = async (googleData) => {
    try {
   
      console.log('Google authentication successful:', googleData);
      alert('Sign up successful'); 
      navigate('/exercises');
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  const handleGoogleSignupFailure = (error) => {
    console.error('Google authentication failed:', error);
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Create An Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="signupFirstName">First Name:</label>
          <input
            type="text"
            id="signupFirstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            pattern="[A-Za-z]+"
            title="Only alphabets allowed"
          />
          <span className="error-message">{errorMessages.firstName}</span>
        </div>
        <div className="form-group">
          <label htmlFor="signupLastName">Last Name:</label>
          <input
            type="text"
            id="signupLastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            pattern="[A-Za-z]+"
            title="Only alphabets allowed"
          />
          <span className="error-message">{errorMessages.lastName}</span>
        </div>
        <div className="form-group">
          <label htmlFor="signupEmail">Email:</label>
          <input
            type="email"
            id="signupEmail"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="error-message">{errorMessages.email}</span>
        </div>
        <div className="form-group">
          <label htmlFor="signupPassword">Password:</label>
          <input
            type="password"
            id="signupPassword"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="error-message">{errorMessages.password}</span>
        </div>
        <div className="form-group">
          <label htmlFor="signupConfirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="signupConfirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="error-message">{errorMessages.confirmPassword}</span>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        <div className="google-signup">
          <GoogleLogin
            clientId=""
            buttonText="Sign Up with Google"
            onSuccess={handleGoogleSignupSuccess}
            onFailure={handleGoogleSignupFailure}
            cookiePolicy={'single_host_origin'}
            className="google-login-button"
          />
        </div>
        <div className="login-link">
          <span>Have an account? </span><span className="login-text" onClick={() => navigate('/login')}><strong>Log in</strong></span>.
        </div>
      </form>
    </div>
  );
};

export default SignupPage;












