package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name= "schedule")
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

    public Schedule(){

    }

    public Schedule(Integer barberId, String scheduleDay, String scheduleTime, Boolean available) {
        this.barberId = barberId;
        this.scheduleDay = scheduleDay;
        this.scheduleTime = scheduleTime;
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBarberId() {
        return barberId;
    }

    public void setBarberId(Integer barberId) {
        this.barberId = barberId;
    }

    public String getScheduleDay() {
        return scheduleDay;
    }

    public void setScheduleDay(String scheduleDay) {
        this.scheduleDay = scheduleDay;
    }

    public String getScheduleTime() {
        return scheduleTime;
    }

    public void setScheduleTime(String scheduleTime) {
        this.scheduleTime = scheduleTime;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
    
}
