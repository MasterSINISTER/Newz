package com.newZ.Newz.apiResponse;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;


public class apiRes {


    public static class Article {
        private String newsID; // Unique ID for each article
        private Source source;
        private String author;
        private String title;
        private String description;
        private String url;
        private String urlToImage;

        public String getNewsID() {
            return newsID;
        }

        public void setNewsID(String newsID) {
            this.newsID = newsID;
        }

        public Source getSource() {
            return source;
        }

        public void setSource(Source source) {
            this.source = source;
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

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
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

        public Date getPublishedAt() {
            return publishedAt;
        }

        public void setPublishedAt(Date publishedAt) {
            this.publishedAt = publishedAt;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        private Date publishedAt;
        private String content;

    }


    public static class Root {
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public int getTotalResults() {
            return totalResults;
        }

        public void setTotalResults(int totalResults) {
            this.totalResults = totalResults;
        }

        public ArrayList<Article> getArticles() {
            return articles;
        }

        public void setArticles(ArrayList<Article> articles) {
            this.articles = articles;
        }

        private int totalResults;
        private ArrayList<Article> articles;
    }


    public static class Source {
        private String id;
        private String name;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
