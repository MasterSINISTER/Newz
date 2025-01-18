package com.newZ.Newz.repo;

import com.newZ.Newz.apiResponse.apiRes;
import com.newZ.Newz.entity.News;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface NewsRepo extends MongoRepository<News,String> {
    Optional<apiRes.Article> findByNewsID(String newsID);

}
