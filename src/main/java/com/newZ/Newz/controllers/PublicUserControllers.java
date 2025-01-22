package com.newZ.Newz.controllers;


import com.newZ.Newz.entity.User;
import com.newZ.Newz.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/public")
public class PublicUserControllers {
    @Autowired
    private UserServices userServices;

    @PostMapping("/add-user")
    public ResponseEntity<?> addNewUser(@RequestBody User user){
        try{
            userServices.saveUser(user);
            return new ResponseEntity<>("Added User !",HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>("Please Check Credentials",HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping("/email-verify/{username}")
    public ResponseEntity<?>emailValidationCheck(@PathVariable String username){
        Optional<User> user= Optional.ofNullable(userServices.getUserByUsername(username));
        if(userServices.getValidation(user.get().getEmail())){
            return new ResponseEntity<>("Valid !",HttpStatus.OK);
        }
        return new ResponseEntity<>("Not Valid !",HttpStatus.BAD_REQUEST);
    }
}
