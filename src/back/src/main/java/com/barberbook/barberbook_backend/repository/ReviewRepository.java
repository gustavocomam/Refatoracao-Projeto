package com.barberbook.barberbook_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.barberbook.barberbook_backend.model.Review;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
        List<Review> findByBarberId(Integer barberId);

        List<Review> findByClientId(Integer clientId);

        List<Review> findByBarberIdIn(List<Integer> barberIds);

        List<Review> findByClientIdIn(List<Integer> clientIds);
}