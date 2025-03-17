package com.barberbook.barberbook_backend.factory;

import com.barberbook.barberbook_backend.model.Review;

public class ReviewFactory {

    public static Review createReview(Integer clientId, Integer barberId, String comment, String reviewDate, int stars) {
        return new Review(clientId, barberId, comment, reviewDate, stars);
    }
}
