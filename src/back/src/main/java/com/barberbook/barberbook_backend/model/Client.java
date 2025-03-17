package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;
    private Integer barbershopId;
    private String cpf;
    private String password;

    // 🔹 Construtor privado
    private Client(String name, Integer barbershopId, String cpf, String password) {
        this.name = name;
        this.barbershopId = barbershopId;
        this.cpf = cpf;
        this.password = password;
    }

    // 🔹 Método Factory
    protected static Client create(String name, Integer barbershopId, String cpf, String password) {
        return new Client(name, barbershopId, cpf, password);
    }

    // Getters
    public Integer getId() { return id; }
    public String getName() { return name; }
    public Integer getBarbershopId() { return barbershopId; }
    public String getCpf() { return cpf; }
    public String getPassword() { return password; }
}
