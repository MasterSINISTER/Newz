package com.newZ.Newz.repo;

import com.newZ.Newz.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

@Configuration
public interface UserRepo extends MongoRepository<User,String> {
    Optional<User>findByUsername(String username);

}
