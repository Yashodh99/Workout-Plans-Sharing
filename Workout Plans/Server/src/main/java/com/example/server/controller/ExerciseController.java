
package com.example.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.server.model.Exercise;
import com.example.server.service.ExerciseService;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping
    public ResponseEntity<List<Exercise>> getAllExercises() {
        List<Exercise> exercises = exerciseService.getAllExercises();
        return ResponseEntity.ok(exercises);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
        Exercise exercise = exerciseService.getExerciseById(id);
        if (exercise != null) {
            return ResponseEntity.ok(exercise);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
        Exercise createdExercise = exerciseService.createExercise(exercise);
        return ResponseEntity.ok(createdExercise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Exercise updatedExercise) {
        Exercise exercise = exerciseService.getExerciseById(id);
        if (exercise != null) {
            updatedExercise.setId(id);
            Exercise savedExercise = exerciseService.updateExercise(updatedExercise);
            return ResponseEntity.ok(savedExercise);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        Exercise exercise = exerciseService.getExerciseById(id);
        if (exercise != null) {
            exerciseService.deleteExercise(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
