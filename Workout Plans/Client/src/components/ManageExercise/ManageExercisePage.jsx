import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ManageExercise/ManageExercisePage.css'; 

const ManageExercisePage = () => {
  const [exercises, setExercises] = useState([]);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedSets, setUpdatedSets] = useState(0);
  const [updatedRepetitions, setUpdatedRepetitions] = useState(0);
  const [updatedRoutine, setUpdatedRoutine] = useState(''); 
  const [editExerciseId, setEditExerciseId] = useState(null);
  const [updatedField, setUpdatedField] = useState(null); 
  const [nameError, setNameError] = useState('');
  const [setsError, setSetsError] = useState('');
  const [repetitionsError, setRepetitionsError] = useState('');
  const [routineError, setRoutineError] = useState(''); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchExercises(); 
  }, []); 

  // Fetch exercises from the server
  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/exercises');
      console.log(response.data); 
      if (Array.isArray(response.data)) {
        setExercises(response.data);
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      if (!validateInputs()) return;
      
      const response = await axios.put(`http://localhost:8080/api/exercises/${id}`, {
        name: updatedName,
        sets: updatedSets,
        repetitions: updatedRepetitions,
        routine: updatedRoutine 
      });
      setExercises(exercises.map(exercise => (exercise.id === id ? response.data : exercise)));
      clearUpdateForm();
      const exerciseName = exercises.find(exercise => exercise.id === id).name;
      if (updatedField === 'name') {
        alert(`Exercise name successfully changed.`);
      } else {
        alert(`Exercise "${exerciseName}" ${updatedField} updated successfully.`);
      }
    } catch (error) {
      console.error('Error updating exercise:', error);
    }
  };

  const handleEdit = (id, exerciseName, exerciseSets, exerciseRepetitions, exerciseRoutine) => {
    setEditExerciseId(id);
    setUpdatedName(exerciseName);
    setUpdatedSets(exerciseSets);
    setUpdatedRepetitions(exerciseRepetitions);
    setUpdatedRoutine(exerciseRoutine); 
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exercise?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/exercises/${id}`);
        setExercises(exercises.filter(exercise => exercise.id !== id));
      } catch (error) {
        console.error('Error deleting exercise:', error);
      }
    }
  };

  const clearUpdateForm = () => {
    setEditExerciseId(null);
    setUpdatedName('');
    setUpdatedSets(0);
    setUpdatedRepetitions(0);
    setUpdatedRoutine(''); 
    setUpdatedField(null);
    setNameError('');
    setSetsError('');
    setRepetitionsError('');
    setRoutineError(''); 
  };

  const handleInputChange = (field) => {
    setUpdatedField(field);
  };

  const handleCancelEdit = () => {
    clearUpdateForm();
  };

  const validateInputs = () => {
    let isValid = true;
    if (!updatedName.trim() || !isNaN(updatedName)) {
      setNameError('Exercise name should be a non-empty string.');
      isValid = false;
    } else {
      setNameError('');
    }
    if (isNaN(updatedSets) || updatedSets < 0) {
      setSetsError('Sets should be a non-negative number.');
      isValid = false;
    } else {
      setSetsError('');
    }
    if (isNaN(updatedRepetitions) || updatedRepetitions < 0) {
      setRepetitionsError('Repetitions should be a non-negative number.');
      isValid = false;
    } else {
      setRepetitionsError('');
    }
    
    return isValid;
  };

  

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.routine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-exercise-container">
      <h1 className="manage-exercise-heading">Manage Your Exercises</h1>
      <input
        type="text"
        placeholder="Search Exercises..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ padding: '10px' }}
      />
      <table className="exercise-table">
        <thead>
          <tr>
            <th>Exercise Name {nameError && <span className="error">{nameError}</span>}</th>
            <th>Sets {setsError && <span className="error">{setsError}</span>}</th>
            <th>Repetitions {repetitionsError && <span className="error">{repetitionsError}</span>}</th>
            <th>Routine {routineError && <span className="error">{routineError}</span>}</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExercises.map((exercise) => (
            <tr key={exercise.id}>
              <td>{editExerciseId === exercise.id ? (
                <div>
                  <input type="text" value={updatedName} onChange={(e) => {setUpdatedName(e.target.value); handleInputChange('name');}} />
                  {nameError && <span className="error">{nameError}</span>}
                </div>
              ) : (
                <span>{exercise.name}</span>
              )}</td>
              <td>{editExerciseId === exercise.id ? (
                <div>
                  <input type="number" value={updatedSets} onChange={(e) => {setUpdatedSets(parseInt(e.target.value)); handleInputChange('sets');}} />
                  {setsError && <span className="error">{setsError}</span>}
                </div>
              ) : (
                <span>{exercise.sets}</span>
              )}</td>
              <td>{editExerciseId === exercise.id ? (
                <div>
                  <input type="number" value={updatedRepetitions} onChange={(e) => {setUpdatedRepetitions(parseInt(e.target.value)); handleInputChange('repetitions');}} />
                  {repetitionsError && <span className="error">{repetitionsError}</span>}
                </div>
              ) : (
                <span>{exercise.repetitions}</span>
              )}</td>
              <td>{editExerciseId === exercise.id ? (
                <div>
                  <select value={updatedRoutine} onChange={(e) => {setUpdatedRoutine(e.target.value); handleInputChange('routine');}}>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                  {routineError && <span className="error">{routineError}</span>}
                </div>
              ) : (
                <span>{exercise.routine}</span>
              )}</td>
              <td>
                {editExerciseId === exercise.id ? (
                  <div>
                    <button onClick={() => handleUpdate(exercise.id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <React.Fragment>
                    <button onClick={() => handleEdit(exercise.id, exercise.name, exercise.sets, exercise.repetitions, exercise.routine)}>Edit</button>
                    <button onClick={() => handleDelete(exercise.id)}>Delete</button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageExercisePage;