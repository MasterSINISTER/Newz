package com.newZ.Newz.services;

import com.newZ.Newz.entity.User;
import com.newZ.Newz.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDetailServiceImp implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<User> users=userRepo.findByUsername(username);
        if(users.isPresent()){
            return org.springframework.security.core.userdetails.User.builder()
                    .username(users.get().getUsername())
                    .password(users.get().getPassword())
                    .build();
        }
        throw new UsernameNotFoundException("User Not Found !");
    }
}
