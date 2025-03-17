package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Barbershop")
public class Barbershop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;
    private String phoneNumber;
    private String address;
    private String instagram;

    // 🔹 Construtor privado
    private Barbershop(String name, String phoneNumber, String address, String instagram) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.instagram = instagram;
    }

    // 🔹 Método Factory
    protected static Barbershop create(String name, String phoneNumber, String address, String instagram) {
        return new Barbershop(name, phoneNumber, address, instagram);
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getAddress() { return address; }
    public String getInstagram() { return instagram; }
}
