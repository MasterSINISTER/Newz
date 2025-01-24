package com.newZ.Newz.entity;


import lombok.NonNull;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "news-entries")

public class News {

    @Id
    private ObjectId id;
    @NonNull
    private String newsID;

    private String sourceName;

    private String author;

    private String title;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public @NonNull String getNewsID() {
        return newsID;
    }

    public void setNewsID(@NonNull String newsID) {
        this.newsID = newsID;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrlToImage() {
        return urlToImage;
    }

    public void setUrlToImage(String urlToImage) {
        this.urlToImage = urlToImage;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

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
