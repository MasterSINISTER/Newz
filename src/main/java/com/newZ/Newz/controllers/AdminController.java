package com.newZ.Newz.controllers;


import com.newZ.Newz.entity.User;
import com.newZ.Newz.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserServices userServices;



    @DeleteMapping("/delete")
    public ResponseEntity<?>delete(){
        try{
            Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
            String username=authentication.getName();
            userServices.deleteUser(username);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>("Something Went Wrong!",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUser(){
        try{
            List<User> allUsers=userServices.getAllUser();
            return new ResponseEntity<>(allUsers,HttpStatus.OK);
        }
        catch (Exception e){
            throw new RuntimeException("Something Went Wrong !");
        }
    }

    @GetMapping("/get-user")
    public ResponseEntity<?> UserByID(){
        try{
            Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
            String username=authentication.getName();
            Optional<User> user= Optional.ofNullable(userServices.getUserByUsername(username));
            if(user.isPresent()){

                return new ResponseEntity<>(user.get(), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            return new ResponseEntity<>("Not Found",HttpStatus.NOT_FOUND);
        }
    }

}


