package com.barberbook.barberbook_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberbook.barberbook_backend.model.AppointmentDTO;
import com.barberbook.barberbook_backend.model.Appointments;
import com.barberbook.barberbook_backend.service.AppointmentsService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentsController {

    @Autowired
    private AppointmentsService appointmentsService;

    @PostMapping
    public ResponseEntity<Appointments> createAppointment(@RequestBody Appointments appointment) {
        Appointments createdAppointment = appointmentsService.createAppointment(appointment);
        return ResponseEntity.status(201).body(createdAppointment);
    }

    @GetMapping
    public ResponseEntity<List<Appointments>> getAllAppointments() {
        List<Appointments> appointments = appointmentsService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/barber/{barberId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByBarberId(@PathVariable Long barberId) {
        List<AppointmentDTO> appointments = appointmentsService.getAppointmentsByBarberId(barberId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointments> getAppointmentById(@PathVariable Long id) {
        return appointmentsService.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Appointments>> getAppointmentsByClientId(@PathVariable Long clientId) {
        List<Appointments> appointments = appointmentsService.getAppointmentsByClientId(clientId);
        return ResponseEntity.ok(appointments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointmentById(@PathVariable Long id) {
        if (appointmentsService.getAppointmentById(id).isPresent()) {
            appointmentsService.deleteAppointmentById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/average-revenue")
    public ResponseEntity<Double> getAverageRevenue() {
        Double averageRevenue = appointmentsService.calculateAverageRevenue();
        return ResponseEntity.ok(averageRevenue);
    }
}
