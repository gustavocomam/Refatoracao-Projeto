package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "barber_id", nullable = false)
    private Integer barberId;

    @Column(name = "schedule_day", nullable = false)
    private String scheduleDay;

    @Column(name = "schedule_time", nullable = false)
    private String scheduleTime;

    @Column(name = "available", nullable = false)
    private Boolean available;

    // 🔹 Construtor privado para impedir instanciação direta
    private Schedule(Integer barberId, String scheduleDay, String scheduleTime, Boolean available) {
        this.barberId = barberId;
        this.scheduleDay = scheduleDay;
        this.scheduleTime = scheduleTime;
        this.available = available;
    }

    // 🔹 Método Factory para criar instâncias
    protected static Schedule create(Integer barberId, String scheduleDay, String scheduleTime, Boolean available) {
        return new Schedule(barberId, scheduleDay, scheduleTime, available);
    }

    // Getters
    public Long getId() { return id; }
    public Integer getBarberId() { return barberId; }
    public String getScheduleDay() { return scheduleDay; }
    public String getScheduleTime() { return scheduleTime; }
    public Boolean getAvailable() { return available; }
}
