package com.barberbook.barberbook_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.barberbook.barberbook_backend.repository.BarberRepository;
import com.barberbook.barberbook_backend.model.Barber;
import java.util.List;
import java.util.Optional;

@Service
public class BarberService {

    private final BarberRepository barberRepository;

    @Autowired
    public BarberService(BarberRepository barberRepository) {
        this.barberRepository = barberRepository;
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
