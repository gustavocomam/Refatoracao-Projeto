package com.barberbook.barberbook_backend.controller;

import com.barberbook.barberbook_backend.model.Services;
import com.barberbook.barberbook_backend.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service") // Singular "service" is more RESTful
@CrossOrigin(origins = "http://localhost:3000")
public class ServicesController {

    @Autowired
    private ServicesService servicesService;

    @GetMapping("/barber/{barberId}")
    public ResponseEntity<List<Services>> getServicesByBarberId(@PathVariable Integer barberId) {
        List<Services> services = servicesService.getServicesByBarberId(barberId);
        return !services.isEmpty() ? new ResponseEntity<>(services, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/barbershop/{barbershopId}/services")
    public List<Services> getServicesByBarbershop(@PathVariable Integer barbershopId) {
        return servicesService.getServicesByBarbershopId(barbershopId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Services> getServiceById(@PathVariable Long id) {
        Services service = servicesService.getServiceById(id);
        return service != null ? new ResponseEntity<>(service, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Services> createService(@RequestBody Services service) {
        return new ResponseEntity<>(servicesService.createService(service), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Services> updateService(@PathVariable Long id, @RequestBody Services service) {
        Services updatedService = servicesService.updateService(id, service);
        return updatedService != null ? new ResponseEntity<>(updatedService, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        servicesService.deleteService(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}