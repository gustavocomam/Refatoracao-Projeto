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

    // 🔹 Construtor privado para impedir instanciação direta
    private Services(String name, BigDecimal servicePrice, boolean serviceType, Integer barberId) {
        this.name = name;
        this.servicePrice = servicePrice;
        this.serviceType = serviceType;
        this.barberId = barberId;
    }

    // 🔹 Método Factory para criar instâncias
    protected static Services create(String name, BigDecimal servicePrice, boolean serviceType, Integer barberId) {
        return new Services(name, servicePrice, serviceType, barberId);
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public BigDecimal getServicePrice() { return servicePrice; }
    public boolean isServiceType() { return serviceType; }
    public Integer getBarberId() { return barberId; }
}
