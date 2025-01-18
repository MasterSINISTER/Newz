package com.newZ.Newz.services;

import com.newZ.Newz.entity.User;
import com.newZ.Newz.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.*;

@Service
public class UserServices {

    @Autowired
    private UserRepo userRepo;

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    public void saveUser(User user) {
        try {
            if(user.getEmail().contains("@gmail.com")){
                String randomID=UUID.randomUUID().toString();
                user.setRoles(Arrays.asList("USER"));
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.setUserID(randomID);
                userRepo.save(user);
            }
            else{
                throw new RuntimeException("Wrong Credentials !");
            }

        } catch (Exception e) {
            throw new RuntimeException("Something Went Wrong!");
        }
    }

    public void updateTheUserEntry(User user){
        userRepo.save(user);
    }

    public void deleteUser(String username) {

        Optional<User> existingUser = userRepo.findByUsername(username);
        if(existingUser.isPresent()){
        userRepo.delete(existingUser.get());

        }
        else{
            throw new RuntimeException("User Not Found");
        }
    }
    public List<User> getAllUser(){
        return userRepo.findAll();
    }

    public User getUserByUsername(String username){
        try{
            Optional<User>foundUser=userRepo.findByUsername(username);
            if(foundUser.isPresent()){
                return foundUser.get();
            }
            else{
                throw new RuntimeException("User Not Found");
            }
        }
        catch (Exception e){
            throw new RuntimeException("Something Went Wrong !");
        }

    }

    public void updateUser(User user){
        userRepo.save(user);
    }

    public void updateThePassword(User user,String password){
        try{
            user.setPassword(passwordEncoder.encode(password));
            userRepo.save(user);
        }
        catch (Exception e){
            throw new RuntimeException("Something Went Wrong !");
        }

    }

}
