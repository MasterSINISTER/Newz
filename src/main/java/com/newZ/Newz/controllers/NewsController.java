package com.newZ.Newz.controllers;


import com.newZ.Newz.apiResponse.apiRes;
import com.newZ.Newz.entity.News;
import com.newZ.Newz.entity.User;
import com.newZ.Newz.repo.NewsRepo;
import com.newZ.Newz.services.NewsAPIService;
import com.newZ.Newz.services.UserServices;
import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class NewsController {

    @Autowired
    private NewsAPIService newsAPIService;
    @Autowired
    private UserServices userServices;


    @GetMapping("/top-news")
    public ResponseEntity<?> getNews() {
        try {
            // Get the news article object
            List<apiRes.Article> article = newsAPIService.getNews();

            // Return the article object as a response
            return new ResponseEntity<>(article, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error fetching news: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{query}")
    public ResponseEntity<?> getQueryNews(@PathVariable String query) {
        List<apiRes.Article> article = newsAPIService.getQuerySearch(query);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }


    @GetMapping("/news/{id}")
    public ResponseEntity<?> getTheEntry(@PathVariable String id){
       try{
               apiRes.Article newsByID = newsAPIService.getNewsByID(id);
           return new ResponseEntity<>(newsByID,HttpStatus.OK);
       }
       catch (Exception e){
           return new ResponseEntity<>("Something is Wrong!",HttpStatus.BAD_REQUEST);
       }
    }

    @PostMapping("/save-news/{newsID}")
    public ResponseEntity<?> saveTheNews(@PathVariable String newsID) {
        try {
            apiRes.Article newsArticle = newsAPIService.getNewsByID(newsID);
            if (newsArticle == null) {
                return new ResponseEntity<>("No News with NewsID Found: " + newsID, HttpStatus.NOT_FOUND);
            }

            News news = new News();
            news.setAuthor(newsArticle.getAuthor());
            news.setNewsID(newsArticle.getNewsID());
            news.setTitle(newsArticle.getTitle());
            news.setSourceName(newsArticle.getSource().getName());
            news.setDescription(newsArticle.getDescription());
            news.setUrl(newsArticle.getUrl());
            news.setUrlToImage(newsArticle.getUrlToImage());
            news.setContent(newsArticle.getContent());

            newsAPIService.saveNews(news);
            return new ResponseEntity<>("News Saved Successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Logs the full stack trace
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-news")
    public ResponseEntity<?>getUserNews(){
        try{
            Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
            String getUsername=authentication.getName();
            Optional<User>user= Optional.ofNullable(userServices.getUserByUsername(getUsername));
            if(user.isPresent()){
                List<News> articles=user.get().getSaved();
                if(articles.isEmpty()){
                    return new ResponseEntity<>("Empty !",HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity<>(articles,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (Exception e){
            throw new RuntimeException("Something Went Wrong !");
        }
    }


    @GetMapping("/get-news/{id}")
    public ResponseEntity<?> getUserNewsByID(@PathVariable String id) {
        try {
            // Check for null or empty 'id' before proceeding
            if (id == null || id.isEmpty()) {
                return new ResponseEntity<>("Invalid News ID", HttpStatus.BAD_REQUEST);
            }

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String getUsername = authentication.getName();

            Optional<User> user = Optional.ofNullable(userServices.getUserByUsername(getUsername));
            if (user.isPresent()) {
                List<News> articles = user.get().getSaved();

                if (articles.isEmpty()) {
                    return new ResponseEntity<>("No saved news found.", HttpStatus.NOT_FOUND);
                }
                Optional<News> foundNews = articles.stream()
                        .filter(a -> a.getNewsID() != null && a.getNewsID().equals(id)) // Ensure newsID is not null
                        .findFirst();

                if (foundNews.isPresent()) {
                    return new ResponseEntity<>(foundNews.get(), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("News with the specified ID not found.", HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>("User not found.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Something went wrong: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteNewsByID(@PathVariable String id){
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        String authUsername=auth.getName();
        if(!authUsername.isEmpty()){
            try{
                newsAPIService.deleteNews(authUsername,id);
                return new ResponseEntity<>("News Delete Successfully",HttpStatus.OK);
            }
            catch (Exception e){
                return new ResponseEntity<>("News not Found !",HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>("Something Went Wrong !",HttpStatus.INTERNAL_SERVER_ERROR);
    }



}
