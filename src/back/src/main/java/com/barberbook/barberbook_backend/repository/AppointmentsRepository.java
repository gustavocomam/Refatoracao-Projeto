package com.barberbook.barberbook_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.barberbook.barberbook_backend.model.AppointmentDTO;
import com.barberbook.barberbook_backend.model.Appointments;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointments, Long> {

    @Query("SELECT COALESCE(SUM(a.totalPrice), 0) FROM Appointments a")
    Double findTotalRevenue();

    @Query("SELECT COUNT(a) FROM Appointments a")
    Long findTotalAppointments();

    @Query("SELECT new com.barberbook.barberbook_backend.model.AppointmentDTO(" +
            "a.id, a.clientId, a.totalPrice, a.scheduleId, a.serviceId, a.additionalservice_id) " +
            "FROM Appointments a " +
            "JOIN Schedule s ON a.scheduleId = s.id " +
            "JOIN Barber b ON s.barberId = b.id " +
            "WHERE b.id = :barberId")
    List<AppointmentDTO> findByBarberId(@Param("barberId") Long barberId);

    List<Appointments> findByClientId(Long clientId);
}
