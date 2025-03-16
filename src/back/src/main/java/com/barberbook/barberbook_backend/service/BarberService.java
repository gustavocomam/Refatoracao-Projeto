package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.repository.BarberRepository;
import com.barberbook.barberbook_backend.model.Barber;
import java.util.List;
import java.util.Optional;

public class BarberService {

    private static BarberService INSTANCE;
    private final BarberRepository barberRepository;

    private BarberService(BarberRepository barberRepository) {
        this.barberRepository = barberRepository;
    }

    public static synchronized BarberService getInstance(BarberRepository barberRepository) {
        if (INSTANCE == null) {
            INSTANCE = new BarberService(barberRepository);
        }
        return INSTANCE;
    }

    public List<Barber> getBarbersByBarbershopId(int barbershopId) {
        return barberRepository.findByBarbershopId(barbershopId);
    }

    public List<Barber> getAllBarbers() {
        return barberRepository.findAll();
    }

    public Optional<Barber> getBarberById(int id) {
        return barberRepository.findById(id);
    }

    public Optional<Barber> getBarberByCpf(String cpf) {
        return barberRepository.findByCpf(cpf);
    }

    public Barber createBarber(Barber barber) {
        return barberRepository.save(barber);
    }

    public Barber updateBarber(int id, Barber updatedBarber) {
        return barberRepository.findById(id)
                .map(barber -> {
                    barber.setName(updatedBarber.getName());
                    barber.setCpf(updatedBarber.getCpf());
                    barber.setAdmin(updatedBarber.getAdmin());
                    return barberRepository.save(barber);
                })
                .orElse(null);
    }

    public void deleteBarber(int id) {
        barberRepository.deleteById(id);
    }
}
