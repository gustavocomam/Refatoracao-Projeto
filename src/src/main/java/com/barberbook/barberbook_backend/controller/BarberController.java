package com.barberbook.barberbook_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.barberbook.barberbook_backend.service.BarberService;
import com.barberbook.barberbook_backend.model.Barber;
import java.util.List;

@RestController
@RequestMapping("/api/barber")
@CrossOrigin(origins = "http://localhost:3000")
public class BarberController {

    private final BarberService barberService;

    @Autowired
    public BarberController(BarberService barberService) {
        this.barberService = barberService;
    }

    @GetMapping
    public List<Barber> getAllBarbers() {
        return barberService.getAllBarbers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barber> getBarberById(@PathVariable int id) {
        return barberService.getBarberById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/barbers/{barbershopId}")
    public List<Barber> getBarbersByBarbershopId(@PathVariable int barbershopId) {
        return barberService.getBarbersByBarbershopId(barbershopId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Barber createBarber(@RequestBody Barber barber) {
        return barberService.createBarber(barber);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Barber> updateBarber(@PathVariable int id, @RequestBody Barber updatedBarber) {
        Barber barber = barberService.updateBarber(id, updatedBarber);
        return barber != null ? ResponseEntity.ok(barber) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarber(@PathVariable int id) {
        barberService.deleteBarber(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}
