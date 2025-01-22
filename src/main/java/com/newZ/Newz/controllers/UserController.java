package com.newZ.Newz.controllers;

import com.newZ.Newz.apiResponse.emailRes;
import com.newZ.Newz.entity.User;
import com.newZ.Newz.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServices userServices;

    @PutMapping("/update")
    public ResponseEntity<?> updateTheUser(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authUsername = authentication.getName();
        Optional<User> existingUser = Optional.ofNullable(userServices.getUserByUsername(authUsername));
        if(existingUser.isPresent()){
            User currUser=existingUser.get();
            currUser.setUserID(user.getUserID()!=null&&!user.getUserID().isEmpty()?user.getUserID():currUser.getUserID());
            currUser.setUsername(user.getUsername()!=null&&!user.getUsername().isEmpty()?user.getUsername():currUser.getUsername());
            currUser.setEmail(user.getEmail()!=null&&!user.getEmail().isEmpty()?user.getEmail():currUser.getEmail());
            currUser.setName(user.getName()!=null&&!user.getName().isEmpty()?user.getName():currUser.getName());
            userServices.updateUser(currUser);
            return new ResponseEntity<>("User Updated Successfully",HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("Something Went Wrong !",HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/password-update")
    public ResponseEntity<?>updateThePassword(@RequestBody User user){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String authUsername=authentication.getName();
        Optional<User>exisitingUser= Optional.ofNullable(userServices.getUserByUsername(authUsername));
        if(exisitingUser.isPresent()){
            User currUser=exisitingUser.get();
            String newPassword=user.getPassword();
            userServices.updateThePassword(currUser,newPassword);
            return new ResponseEntity<>("Password Updated !",HttpStatus.OK);
        }
        return new ResponseEntity<>("Something Went Wrong !",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/verify")
    public ResponseEntity<?>getVerified(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String username=authentication.getName();
        Optional<User>user= Optional.ofNullable(userServices.getUserByUsername(username));
        if(user.isPresent()){
            return new ResponseEntity<>(user.get(),HttpStatus.OK);
        }
        return new ResponseEntity<>("Not Found",HttpStatus.NOT_FOUND);
    }





}
