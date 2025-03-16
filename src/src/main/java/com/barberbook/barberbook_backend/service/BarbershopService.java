package com.barberbook.barberbook_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.barberbook.barberbook_backend.repository.BarbershopRepository;
import com.barberbook.barberbook_backend.model.Barbershop;
import java.util.List;
import java.util.Optional;

@Service
public class BarbershopService {

    private final BarbershopRepository barbershopRepository;

    @Autowired
    public BarbershopService(BarbershopRepository barbershopRepository) {
        this.barbershopRepository = barbershopRepository;
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

    public Barbershop updateBarbershop(int id, Barbershop updatedBarbershop) {
        return barbershopRepository.findById(id)
                .map(barbershop -> {
                    barbershop.setName(updatedBarbershop.getName());
                    barbershop.setPhone_number(updatedBarbershop.getPhone_number());
                    barbershop.setAddress(updatedBarbershop.getAddress());
                    barbershop.setInstagram(updatedBarbershop.getInstagram());
                    return barbershopRepository.save(barbershop);
                })
                .orElse(null);
    }

    public void deleteBarbershop(int id) {
        barbershopRepository.deleteById(id);
    }
}