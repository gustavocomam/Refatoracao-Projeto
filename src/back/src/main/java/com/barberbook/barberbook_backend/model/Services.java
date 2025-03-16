package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "services")
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "service_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal servicePrice;

    @Column(name = "service_type", nullable = false)
    private boolean serviceType;

    @Column(name = "barber_id", nullable = false)
    private Integer barberId;

    public Services() {
    }

    public Services(String name, BigDecimal servicePrice, boolean serviceType, Integer barberId) {
        this.name = name;
        this.servicePrice = servicePrice;
        this.serviceType = serviceType;
        this.barberId = barberId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(BigDecimal servicePrice) {
        this.servicePrice = servicePrice;
    }

    public boolean isServiceType() {
        return serviceType;
    }

    public void setServiceType(boolean serviceType) {
        this.serviceType = serviceType;
    }

    public Integer getBarberId() {
        return barberId;
    }

    public void setBarberId(int barber_id) {
        this.barberId = barber_id;
    }
}