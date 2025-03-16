package com.barberbook.barberbook_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.barberbook.barberbook_backend.service.ReviewService;
import com.barberbook.barberbook_backend.model.Review;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/barber/{barberId}")
    public ResponseEntity<List<Review>> getReviewByBarberId(@PathVariable Integer barberId) {
        List<Review> reviews = reviewService.getReviewsByBarberId(barberId);
        return !reviews.isEmpty() ? new ResponseEntity<>(reviews, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/barbershop/{barbershopId}/reviews")
    public List<Review> getReviewsByBarbershop(@PathVariable Integer barbershopId) {
        return reviewService.getReviewsByBarbershopId(barbershopId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Review review = reviewService.getReviewById(id);
        return review != null ? new ResponseEntity<>(review, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        return new ResponseEntity<>(reviewService.createReview(review), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review review) {
        Review updatedReview = reviewService.updateReview(id, review);
        return updatedReview != null ? new ResponseEntity<>(updatedReview, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}