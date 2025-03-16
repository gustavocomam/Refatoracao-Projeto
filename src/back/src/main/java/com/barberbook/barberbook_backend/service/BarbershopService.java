package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.repository.BarbershopRepository;
import com.barberbook.barberbook_backend.model.Barbershop;
import java.util.List;
import java.util.Optional;

public class BarbershopService {

    private static BarbershopService INSTANCE;
    private final BarbershopRepository barbershopRepository;

    private BarbershopService(BarbershopRepository barbershopRepository) {
        this.barbershopRepository = barbershopRepository;
    }

    public static synchronized BarbershopService getInstance(BarbershopRepository repository) {
        if (INSTANCE == null) {
            INSTANCE = new BarbershopService(repository);
        }
        return INSTANCE;
    }

    public List<Barbershop> getAllBarbershops() {
        return barbershopRepository.findAll();
    }

    public Optional<Barbershop> getBarbershopById(int id) {
        return barbershopRepository.findById(id);
    }

    public Barbershop createBarbershop(Barbershop barbershop) {
        return barbershopRepository.save(barbershop);
    }

    public void deleteBar
