package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.model.Barber;
import com.barberbook.barberbook_backend.model.Services;
import com.barberbook.barberbook_backend.repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicesService {

    @Autowired
    private ServicesRepository servicesRepository;

    @Autowired
    private BarberService barberService; // Add @Autowired

    public List<Services> getAllServices() {
        return servicesRepository.findAll();
    }

    public List<Services> getServicesByBarbershopId(Integer barbershopId) {
        List<Integer> barberIds = barberService.getBarbersByBarbershopId(barbershopId) // Use barberService
                .stream()
                .map(Barber::getId)
                .collect(Collectors.toList());
    
        return servicesRepository.findByBarberIdIn(barberIds);
    }

    public Services getServiceById(Long id) {
        return servicesRepository.findById(id).orElse(null); // Simplified Optional handling
    }

    public List<Services> getServicesByBarberId(Integer barberId) {
        return servicesRepository.findByBarberId(barberId);
    }

    public Services createService(Services service) {
        return servicesRepository.save(service);
    }

    public Services updateService(Long id, Services service) {
        return servicesRepository.findById(id)
                .map(existingService -> {
                    existingService.setName(service.getName());
                    existingService.setServicePrice(service.getServicePrice());
                    existingService.setServiceType(service.isServiceType());
                    existingService.setBarberId(service.getBarberId());
                    return servicesRepository.save(existingService);
                })
                .orElse(null); // Simplified update logic
    }

    public void deleteService(Long id) {
        servicesRepository.deleteById(id);
    }
}