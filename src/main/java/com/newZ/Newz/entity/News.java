package com.newZ.Newz.entity;


import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "news-entries")
@Getter
@Setter
public class News {

    @Id
    private ObjectId id;
    @NonNull
    private String newsID;
    
    private String sourceName;

    private String author;

    private String title;

    private String url;

    private String urlToImage;

    private String content;

    private String description;


    public void initializeNewsID() {
        if (this.newsID == null || this.newsID.isEmpty()) {
            this.newsID = UUID.randomUUID().toString();
        }
    }


}
