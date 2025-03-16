package com.barberbook.barberbook_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.barberbook.barberbook_backend.service.BarbershopService;
import com.barberbook.barberbook_backend.model.Barbershop;
import java.util.List;

@RestController
@RequestMapping("/api/barbershop")
@CrossOrigin(origins = "http://localhost:3000")
public class BarbershopController {

    private final BarbershopService barbershopService;

    @Autowired
    public BarbershopController(BarbershopService barbershopService) {
        this.barbershopService = barbershopService;
    }

    @GetMapping
    public List<Barbershop> getAllBarbershops() {
        return barbershopService.getAllBarbershops();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbershop> getBarbershopById(@PathVariable int id) {
        return barbershopService.getBarbershopById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Barbershop createBarbershop(@RequestBody Barbershop barbershop) {
        return barbershopService.createBarbershop(barbershop);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Barbershop> updateBarbershop(@PathVariable int id,
            @RequestBody Barbershop updatedBarbershop) {
        Barbershop barbershop = barbershopService.updateBarbershop(id, updatedBarbershop);
        return barbershop != null ? ResponseEntity.ok(barbershop) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarbershop(@PathVariable int id) {
        barbershopService.deleteBarbershop(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}