package com.barberbook.barberbook_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.barberbook.barberbook_backend.model.Barbershop;

@Repository
public interface BarbershopRepository extends JpaRepository<Barbershop, Integer> {
}