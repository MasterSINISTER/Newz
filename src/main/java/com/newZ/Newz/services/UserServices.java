package com.newZ.Newz.services;

import com.newZ.Newz.apiResponse.apiRes;
import com.newZ.Newz.apiResponse.emailRes;
import com.newZ.Newz.entity.User;
import com.newZ.Newz.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.*;

@Slf4j
@Service
public class UserServices {

    @Autowired
    private UserRepo userRepo;

    RestTemplate restTemplate() {
        return new RestTemplate();
    }

    private static final String apiKey = "52d99e4a987646f1a70962113f0d0c86";
    private static final String emailValidation = "https://emailvalidation.abstractapi.com/v1/?api_key=API_KEY&email=EMAIL_CHECK";



    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveUser(User user) {
        try {
            if (user.getEmail().contains("@gmail.com")) {
                String randomID = UUID.randomUUID().toString();
                user.setRoles(Arrays.asList("USER"));
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.setUserID(randomID);
                user.setUserImage(user.getUserImage());
                userRepo.save(user);
            } else {
                throw new RuntimeException("Wrong Credentials !");
            }

        } catch (Exception e) {
            throw new RuntimeException("Something Went Wrong!"+e.getMessage());
        }
    }


    public boolean getValidation(String email){
        try{
            String finalAPI=emailValidation.replace("API_KEY",apiKey).replace("EMAIL_CHECK",email);
            log.info(finalAPI);
            ResponseEntity<emailRes>response=restTemplate().exchange(finalAPI,HttpMethod.GET,null, emailRes.class);
            log.info(response.toString());
            String body= Objects.requireNonNull(response.getBody()).deliverability;
            return body.equals("DELIVERABLE");
        }
        catch (Exception e){
            throw new RuntimeException("Something Went Wrong !");
        }
    }

    public void updateTheUserEntry(User user) {
        userRepo.save(user);
    }

    public void deleteUser(String username) {

        Optional<User> existingUser = userRepo.findByUsername(username);
        if (existingUser.isPresent()) {
            userRepo.delete(existingUser.get());

        } else {
            throw new RuntimeException("User Not Found");
        }
    }

    public List<User> getAllUser() {
        return userRepo.findAll();
    }

    public User getUserByUsername(String username) {
        try {
            Optional<User> foundUser = userRepo.findByUsername(username);
            if (foundUser.isPresent()) {
                return foundUser.get();
            } else {
                throw new RuntimeException("User Not Found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Something Went Wrong !");
        }

    }

    public void updateUser(User user) {
        userRepo.save(user);
    }

    public void updateThePassword(User user, String password) {
        try {
            user.setPassword(passwordEncoder.encode(password));
            userRepo.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Something Went Wrong !");
        }

    }

    public void updateProfilePhoto(User user,String imageURL){
        try{
            user.setUserImage(imageURL);
            userRepo.save(user);
        }
        catch (Exception e){
            throw new RuntimeException("Something went Wrong");
        }
    }

    public String getUserProfileImage(User user){
            return user.getUserImage();
    }

}
