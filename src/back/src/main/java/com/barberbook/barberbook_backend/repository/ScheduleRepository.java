package com.barberbook.barberbook_backend.repository;

import com.barberbook.barberbook_backend.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
        List<Schedule> findByBarberId(Integer barberId);

        List<Schedule> findByBarberIdIn(List<Integer> barberIds);

        long countByBarberIdInAndAvailable(List<Integer> barberIds, Boolean available);
}
