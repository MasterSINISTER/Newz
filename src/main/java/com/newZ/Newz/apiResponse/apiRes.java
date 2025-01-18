package com.newZ.Newz.apiResponse;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class apiRes {

    @Getter
    @Setter
    public static class Article {
        private String newsID; // Unique ID for each article
        private Source source;
        private String author;
        private String title;
        private String description;
        private String url;
        private String urlToImage;
        private Date publishedAt;
        private String content;

    }




    @Getter
    @Setter
    public static class Root {
        private String status;
        private int totalResults;
        private ArrayList<Article> articles;
    }

    @Getter
    @Setter
    public static class Source {
        private String id;
        private String name;
    }
}
