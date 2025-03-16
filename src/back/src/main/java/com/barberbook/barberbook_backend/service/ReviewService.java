package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.model.Barber;
import com.barberbook.barberbook_backend.model.Review;
import com.barberbook.barberbook_backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BarberService barberService;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewsByBarbershopId(Integer barbershopId) {
        List<Integer> barberIds = barberService.getBarbersByBarbershopId(barbershopId)
                .stream()
                .map(Barber::getId)
                .collect(Collectors.toList());
    
        return reviewRepository.findByBarberIdIn(barberIds);
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public List<Review> getReviewsByBarberId(Integer barberId) {
        return reviewRepository.findByBarberId(barberId);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review review) {
        return reviewRepository.findById(id)
                .map(existingReview -> {
                    existingReview.setClientId(review.getClientId());
                    existingReview.setBarberId(review.getBarberId());
                    existingReview.setComment(review.getComment());
                    existingReview.setReview_date(review.getReview_date());
                    existingReview.setStars(review.getStars());
                    return reviewRepository.save(existingReview);
                })
                .orElse(null); // Simplified update logic
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

}
