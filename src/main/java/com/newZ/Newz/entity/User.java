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
@Getter
@Setter
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
    @NonNull
    @Indexed(unique = true)
    private String email;
    @NonNull
    private String password;
    @NonNull
    private List<String> roles;
    @DBRef
    private List<News>saved=new ArrayList<>();


}
