package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "appointment")
public class Appointments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id", nullable = true)
    private Integer clientId;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @Column(name = "schedule_id", nullable = false)
    private Long scheduleId;

    @Column(name = "service_id", nullable = false)
    private Integer serviceId;

    @Column(name = "additionalservice_id", nullable = true)
    private Integer additionalserviceId;

    // 🔹 Construtor privado para evitar instanciação direta
    private Appointments(Integer clientId, Double totalPrice, Long scheduleId, Integer serviceId, Integer additionalserviceId) {
        this.clientId = clientId;
        this.totalPrice = totalPrice;
        this.scheduleId = scheduleId;
        this.serviceId = serviceId;
        this.additionalserviceId = additionalserviceId;
    }

    // 🔹 Método para a Factory criar instâncias
    protected static Appointments create(Integer clientId, Double totalPrice, Long scheduleId, Integer serviceId, Integer additionalserviceId) {
        return new Appointments(clientId, totalPrice, scheduleId, serviceId, additionalserviceId);
    }

    // Getters
    public Long getId() { return id; }
    public Integer getClientId() { return clientId; }
    public Double getTotalPrice() { return totalPrice; }
    public Long getScheduleId() { return scheduleId; }
    public Integer getServiceId() { return serviceId; }
    public Integer getAdditionalserviceId() { return additionalserviceId; }
}
