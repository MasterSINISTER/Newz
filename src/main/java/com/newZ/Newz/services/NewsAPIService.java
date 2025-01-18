package com.newZ.Newz.services;


import com.newZ.Newz.apiResponse.apiRes;
import com.newZ.Newz.entity.News;
import com.newZ.Newz.entity.User;
import com.newZ.Newz.repo.NewsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import java.util.Base64;
import java.util.*;
import java.util.HashMap;

@Component
public class NewsAPIService {
    @Autowired
    private UserServices userServices;

    @Autowired
    private NewsRepo newsRepo;

    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }

    private static final String apiKey = "c26f7074a9484ebbabe04d6adfa833e6";
    private static final String apiURIEverything = "https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY";
    private static final String apiQuerySearch = "https://newsapi.org/v2/everything?q=QUERY_GET&apiKey=API_KEY";


    //Top Heading's

    public List<apiRes.Article> getNews() {
        try {
            String finalAPI = apiURIEverything.replace("API_KEY", apiKey);
            ResponseEntity<apiRes.Root> response = restTemplate().exchange(finalAPI, HttpMethod.GET, null, apiRes.Root.class);
            apiRes.Root body = response.getBody();

            if (body != null && body.getArticles() != null && !body.getArticles().isEmpty()) {
                // Assign a random numeric ID for each article
                body.getArticles().forEach(article -> {
                    if (article.getNewsID() == null || article.getNewsID().isEmpty()) {
                        String uniqueKey = article.getTitle() + article.getAuthor() + article.getUrl();
                        article.setNewsID(getOrAssignRandomId(uniqueKey));
                    }
                });
                return body.getArticles();
            } else {
                throw new RuntimeException("No articles found in the API response.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching news: " + e.getMessage());
        }
    }

    public ArrayList<apiRes.Article> getQuerySearch(String query) {
        try {
            String finalAPI = apiQuerySearch.replace("API_KEY", apiKey).replace("QUERY_GET", query);
            ResponseEntity<apiRes.Root> response = restTemplate().exchange(finalAPI, HttpMethod.GET, null, apiRes.Root.class);
            apiRes.Root body = response.getBody();

            if (body != null && body.getArticles() != null && !body.getArticles().isEmpty()) {
                // Assign a random numeric ID for each article
                body.getArticles().forEach(article -> {
                    if (article.getNewsID() == null || article.getNewsID().isEmpty()) {
                        String uniqueKey = article.getTitle() + article.getAuthor() + article.getUrl();
                        article.setNewsID(getOrAssignRandomId(uniqueKey));
                    }
                });
                return new ArrayList<>(body.getArticles());
            } else {
                throw new RuntimeException("No articles found in the API response.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching news: " + e.getMessage());
        }
    }

    // Utility method to assign or retrieve a random numeric ID
    private synchronized String getOrAssignRandomId(String uniqueKey) {
        // Check if the uniqueKey already has an assigned ID
        if (articleIdMap.containsKey(uniqueKey)) {
            return articleIdMap.get(uniqueKey);
        }
        // Assign a new random numeric ID (e.g., between 1 and 1,000,000)
        String randomId = String.valueOf((int) (Math.random() * 1_000_000));
        articleIdMap.put(uniqueKey, randomId);
        return randomId;
    }

    // Ensure this map is globally declared in your service class
    private final Map<String, String> articleIdMap = new HashMap<>();


    @Transactional
    public void saveNews(News news) {
        if (news == null) {
            throw new IllegalArgumentException("News cannot be null");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("User is not authenticated");
        }

        String username = authentication.getName();
        Optional<User> existingUser = Optional.ofNullable(userServices.getUserByUsername(username));

        if (existingUser.isEmpty()) {
            throw new RuntimeException("No user found with username: " + username);
        }

        User user = existingUser.get();
        News saved = newsRepo.save(news);

        // Ensure saved list is not null and properly initialized
        if (user.getSaved() == null) {
            user.setSaved(new ArrayList<>()); // Or the appropriate collection type
        }
        user.getSaved().add(saved);

        userServices.updateTheUserEntry(user);
    }


    public void deleteNews(String username,String id){
        Optional<User>user= Optional.ofNullable(userServices.getUserByUsername(username));
        if(user.isPresent()){
            boolean newsRemoved=user.get().getSaved().removeIf(x->x.getNewsID().equals(id));
            if (newsRemoved) {
                userServices.updateTheUserEntry(user.get());
                newsRepo.deleteById(id);
            }
        }
        else{
            throw new RuntimeException("Something Went Wrong !");
        }
    }


    public apiRes.Article getNewsByID(String id) {
        List<apiRes.Article> allNews = getNews();
        if (allNews != null) {
            Optional<apiRes.Article> article = allNews.stream()
                    .filter(a -> a.getNewsID().equals(id))
                    .findFirst();
            return article.get();
        }
        throw new RuntimeException("Something went Wrong!");


    }
}
