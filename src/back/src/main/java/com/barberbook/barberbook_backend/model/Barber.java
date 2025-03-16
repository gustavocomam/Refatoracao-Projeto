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
    private Integer barbershop_id;
    private String cpf;
    private String password;
    private Boolean admin;

    public Barber() {
    }

    public Barber(String name, Integer barbershop_id, String cpf, String password, Boolean admin) {
        this.name = name;
        this.barbershop_id = barbershop_id;
        this.cpf = cpf;
        this.password = password;
        this.admin = admin;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBarbershop_id() {
        return barbershop_id;
    }

    public void setBarbershop_id(Integer barbershop_id) {
        this.barbershop_id = barbershop_id;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}
