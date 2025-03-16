package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.repository.ServicesRepository;
import com.barberbook.barberbook_backend.model.Services;
import java.util.List;

public class ServicesService {

    private static ServicesService INSTANCE;
    private final ServicesRepository servicesRepository;

    private ServicesService(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    public static synchronized ServicesService getInstance(ServicesRepository repository) {
        if (INSTANCE == null) {
            INSTANCE = new ServicesService(repository);
        }
        return INSTANCE;
    }

    public List<Services> getAllServices() {
        return servicesRepository.findAll();
    }

    public Services getServiceById(Long id) {
        return servicesRepository.findById(id).orElse(null);
    }

    public Services createService(Services service) {
        return servicesRepository.save(service);
    }
}
