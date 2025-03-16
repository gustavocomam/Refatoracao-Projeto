package com.barberbook.barberbook_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberbook.barberbook_backend.model.AppointmentDTO;
import com.barberbook.barberbook_backend.model.Appointments;
import com.barberbook.barberbook_backend.repository.AppointmentsRepository;

@Service
public class AppointmentsService {

    @Autowired
    private AppointmentsRepository appointmentsRepository;

    public Appointments createAppointment(Appointments appointment) {
        return appointmentsRepository.save(appointment);
    }

    public List<AppointmentDTO> getAppointmentsByBarberId(Long barberId) {
        return appointmentsRepository.findByBarberId(barberId);
    }

    public List<Appointments> getAllAppointments() {
        return appointmentsRepository.findAll();
    }

    public Optional<Appointments> getAppointmentById(Long id) {
        return appointmentsRepository.findById(id);
    }

    public void deleteAppointmentById(Long id) {
        appointmentsRepository.deleteById(id);
    }

    public List<Appointments> getAppointmentsByClientId(Long clientId) {
        return appointmentsRepository.findByClientId(clientId);
    }

    public Appointments updateAppointment(Long id, Appointments appointment) {
        return appointmentsRepository.findById(id)
                .map(existingAppointment -> {
                    existingAppointment.setClientId(appointment.getClientId());
                    existingAppointment.setTotalPrice(appointment.getTotalPrice());
                    existingAppointment.setScheduleId(appointment.getScheduleId());
                    existingAppointment.setadditionalservice_id(appointment.getadditionalservice_id());
                    existingAppointment.setServiceId(appointment.getServiceId());
                    return appointmentsRepository.save(existingAppointment);
                })
                .orElse(null);
    }

    public Double calculateAverageRevenue() {
        Double totalRevenue = appointmentsRepository.findTotalRevenue();
        Long totalAppointments = appointmentsRepository.findTotalAppointments();

        if (totalAppointments == 0) {
            return 0.0; // Evitar divisão por zero
        }

        return totalRevenue / totalAppointments;
    }
}
