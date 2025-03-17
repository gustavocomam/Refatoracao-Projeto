package com.barberbook.barberbook_backend.factory;

import com.barberbook.barberbook_backend.model.Appointments;

public class AppointmentsFactory {

    public static Appointments createAppointment(Integer clientId, Double totalPrice, Long scheduleId, Integer serviceId, Integer additionalServiceId) {
        return new Appointments(clientId, totalPrice, scheduleId, serviceId, additionalServiceId);
    }
}
