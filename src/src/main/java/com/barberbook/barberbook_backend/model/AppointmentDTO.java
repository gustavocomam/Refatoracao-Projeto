package com.barberbook.barberbook_backend.model;

public class AppointmentDTO {

    private Long id;
    private Integer clientId;
    private Double totalPrice;
    private Long scheduleId;
    private Integer serviceId;
    private Integer additionalServiceId;

    public AppointmentDTO() {
    }

    public AppointmentDTO(Long id, Integer clientId, Double totalPrice, Long scheduleId, Integer serviceId,
            Integer additionalServiceId) {
        this.id = id;
        this.clientId = clientId;
        this.totalPrice = totalPrice;
        this.scheduleId = scheduleId;
        this.serviceId = serviceId;
        this.additionalServiceId = additionalServiceId;
    }

    // Getters e Setters
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

    public Integer getAdditionalServiceId() {
        return additionalServiceId;
    }

    public void setAdditionalServiceId(Integer additionalServiceId) {
        this.additionalServiceId = additionalServiceId;
    }
}
