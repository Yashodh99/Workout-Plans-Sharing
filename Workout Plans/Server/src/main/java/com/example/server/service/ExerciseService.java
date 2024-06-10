
package com.example.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.server.repository.ExerciseRepository;
import com.example.server.model.Exercise;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElse(null);
    }

    public Exercise createExercise(Exercise exercise) {
        try {
            return exerciseRepository.save(exercise);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create exercise: " + e.getMessage());
        }
    }

    public Exercise updateExercise(Exercise updatedExercise) {
        return exerciseRepository.save(updatedExercise);
    }

    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}
