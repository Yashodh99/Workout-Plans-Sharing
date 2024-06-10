package com.example.server.service;

import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User signUp(User user) {
        
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}













