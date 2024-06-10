import React, { useState } from 'react';
import axios from 'axios';
import '../Exercise/ExercisePage.css'; 

const ExercisePage = () => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [routine, setRoutine] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    sets: '',
    repetitions: '',
    routine: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !sets || !repetitions || !routine) {
      setErrorMessages({
        name: name ? '' : 'Please enter exercise name',
        sets: sets ? '' : 'Please enter sets',
        repetitions: repetitions ? '' : 'Please enter repetitions',
        routine: routine ? '' : 'Please select routine'
      });
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/exercises', {
        name,
        sets,
        repetitions,
        routine 
      });
      clearForm();
      alert('Exercise added successfully');
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setSets('');
    setRepetitions('');
    setRoutine(''); 
    setErrorMessages({
      name: '',
      sets: '',
      repetitions: '',
      routine: ''
    });
  };

  return (
    <div className="exercise-container">
      <form onSubmit={handleSubmit} className="exercise-form">
        <h2 className="exercise-heading">Enter Your Details</h2>
        <div className="form-group">
          <label htmlFor="exerciseName">Enter Exercise Name:</label>
          <input
            type="text"
            id="exerciseName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="error-message">{errorMessages.name}</span>
        </div>
        <div className="form-group">
          <label htmlFor="sets">Enter Sets:</label>
          <input
            type="number"
            id="sets"
            className="form-control"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span className="error-message">{errorMessages.sets}</span>
        </div>
        <div className="form-group">
          <label htmlFor="repetitions">Enter Repetitions:</label>
          <input
            type="number"
            id="repetitions"
            className="form-control"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
          />
          <span className="error-message">{errorMessages.repetitions}</span>
        </div>
        <div className="form-group">
          <label htmlFor="routine">Select Routine:</label>
          <select
            id="routine"
            className="form-control"
            value={routine}
            onChange={(e) => setRoutine(e.target.value)}
          >
            <option value="">--Select Routine--</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
          <span className="error-message">{errorMessages.routine}</span>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Add Exercise</button>
      </form>
    </div>
  );
};

export default ExercisePage;
