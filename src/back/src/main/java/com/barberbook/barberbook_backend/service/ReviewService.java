package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.repository.ReviewRepository;
import com.barberbook.barberbook_backend.model.Review;
import java.util.List;

public class ReviewService {

    private static ReviewService INSTANCE;
    private final ReviewRepository reviewRepository;

    private ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public static synchronized ReviewService getInstance(ReviewRepository repository) {
        if (INSTANCE == null) {
            INSTANCE = new ReviewService(repository);
        }
        return INSTANCE;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }
}
