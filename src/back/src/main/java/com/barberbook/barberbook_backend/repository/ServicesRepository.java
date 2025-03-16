package com.barberbook.barberbook_backend.repository;

import com.barberbook.barberbook_backend.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicesRepository extends JpaRepository<Services, Long> {
    List<Services> findByBarberId(Integer barberId);

    List<Services> findByBarberIdIn(List<Integer> barberIds);
}