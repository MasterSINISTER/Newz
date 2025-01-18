package com.newZ.Newz.controllers;


import com.newZ.Newz.entity.User;
import com.newZ.Newz.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
