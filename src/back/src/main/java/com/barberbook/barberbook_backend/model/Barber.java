package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Barber")
public class Barber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;
    private Integer barbershopId;
    private String cpf;
    private String password;
    private Boolean admin;

    // 🔹 Construtor privado
    private Barber(String name, Integer barbershopId, String cpf, String password, Boolean admin) {
        this.name = name;
        this.barbershopId = barbershopId;
        this.cpf = cpf;
        this.password = password;
        this.admin = admin;
    }

    // 🔹 Método Factory
    protected static Barber create(String name, Integer barbershopId, String cpf, String password, Boolean admin) {
        return new Barber(name, barbershopId, cpf, password, admin);
    }

    // Getters
    public Integer getId() { return id; }
    public String getName() { return name; }
    public Integer getBarbershopId() { return barbershopId; }
    public String getCpf() { return cpf; }
    public String getPassword() { return password; }
    public Boolean getAdmin() { return admin; }
}
