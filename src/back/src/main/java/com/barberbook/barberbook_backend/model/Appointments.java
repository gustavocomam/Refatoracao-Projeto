package com.barberbook.barberbook_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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
    private Integer additionalservice_id;


    public Appointments() {}

    public Appointments(Integer clientId, Double totalPrice, Long scheduleId, Integer serviceId, Integer additionalservice_id) {
        this.clientId = clientId;
        this.totalPrice = totalPrice;
        this.scheduleId = scheduleId;
        this.serviceId = serviceId;
        this.additionalservice_id = additionalservice_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Integer getadditionalservice_id() {
        return additionalservice_id;
    }

    public void setadditionalservice_id(Integer additionalservice_id) {
        this.additionalservice_id = additionalservice_id;
    }

 

}
