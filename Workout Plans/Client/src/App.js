import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import ExercisePage from './components/Exercise/ExercisePage';
import ManageExercisePage from './components/ManageExercise/ManageExercisePage'; 
import SignupPage from './components/Signup/SignupPage';
import LoginPage from './components/Login/LoginPage';
import { gapi } from "gapi-script";

function App() {
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: "",
      });
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/manage-exercises" element={<ManageExercisePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;


