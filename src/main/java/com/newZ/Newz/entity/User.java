package com.newZ.Newz.entity;


import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user-entries")

public class User {
    @Id
    private ObjectId id;
    @NonNull
    private String userID;
    @NonNull
    private String name;
    @NonNull
    @Indexed(unique = true)
    private String username;

    public @NonNull String getEmail() {
        return email;
    }

    public void setEmail(@NonNull String email) {
        this.email = email;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public @NonNull String getUserID() {
        return userID;
    }

    public void setUserID(@NonNull String userID) {
        this.userID = userID;
    }

    public @NonNull String getName() {
        return name;
    }

    public void setName(@NonNull String name) {
        this.name = name;
    }

    public @NonNull String getUsername() {
        return username;
    }

    public void setUsername(@NonNull String username) {
        this.username = username;
    }

    public @NonNull String getPassword() {
        return password;
    }

    public void setPassword(@NonNull String password) {
        this.password = password;
    }

    public @NonNull List<String> getRoles() {
        return roles;
    }

    public void setRoles(@NonNull List<String> roles) {
        this.roles = roles;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public List<News> getSaved() {
        return saved;
    }

    public void setSaved(List<News> saved) {
        this.saved = saved;
    }

    @NonNull
    @Indexed(unique = true)
    private String email;
    @NonNull
    private String password;
    @NonNull
    private List<String> roles;
    private String userImage;
    @DBRef
    private List<News>saved=new ArrayList<>();


}
