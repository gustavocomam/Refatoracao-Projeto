package com.barberbook.barberbook_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberbook.barberbook_backend.model.Schedule;
import com.barberbook.barberbook_backend.service.ScheduleService;

@RestController
@RequestMapping("/api/schedule") // Singular "service" is more RESTful
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/barber/{barberId}")
    public ResponseEntity<List<Schedule>> getScheduleByBarberId(@PathVariable Integer barberId) {
        List<Schedule> schedule = scheduleService.getScheduleByBarberId(barberId);
        return !schedule.isEmpty() ? new ResponseEntity<>(schedule, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/barbershop/{barbershopId}/schedule")
    public List<Schedule> getScheduleByBarbershop(@PathVariable Integer barbershopId) {
        return scheduleService.getScheduleByBarbershopId(barbershopId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id) {
        Schedule schedule = scheduleService.getScheduleById(id);
        return schedule != null ? new ResponseEntity<>(schedule, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/api/schedule/barbershop/{barbershopId}/occupied-percentage")
    public ResponseEntity<Double> getOccupiedPercentage(@PathVariable Integer barbershopId) {
        double percentage = scheduleService.calcularPorcentagemOcupado(barbershopId);
        return new ResponseEntity<>(percentage, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Schedule> createSchedule(@RequestBody Schedule schedule) {
        return new ResponseEntity<>(scheduleService.createSchedule(schedule), HttpStatus.CREATED);
    }

    @PutMapping("/client/{id}")
    public ResponseEntity<Schedule> updateScheduleClient(@PathVariable Long id, @RequestBody Schedule schedule) {
        Schedule updatedSchedule = scheduleService.updateSchedule(id, schedule);
        return updatedSchedule != null ? new ResponseEntity<>(updatedSchedule, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable Long id, @RequestBody Schedule schedule) {
        Schedule updatedSchedule = scheduleService.updateSchedule(id, schedule);
        return updatedSchedule != null ? new ResponseEntity<>(updatedSchedule, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
