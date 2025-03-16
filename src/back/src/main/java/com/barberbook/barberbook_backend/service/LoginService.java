package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.repository.BarberRepository;
import com.barberbook.barberbook_backend.repository.ClientRepository;
import com.barberbook.barberbook_backend.model.Client;
import com.barberbook.barberbook_backend.model.Barber;
import java.util.Optional;

public class LoginService {

    private static LoginService INSTANCE;
    private final ClientRepository clientRepository;
    private final BarberRepository barberRepository;

    private LoginService(ClientRepository clientRepository, BarberRepository barberRepository) {
        this.clientRepository = clientRepository;
        this.barberRepository = barberRepository;
    }

    public static synchronized LoginService getInstance(ClientRepository clientRepo, BarberRepository barberRepo) {
        if (INSTANCE == null) {
            INSTANCE = new LoginService(clientRepo, barberRepo);
        }
        return INSTANCE;
    }

    public Object findUserByCpf(String cpf) {
        Optional<Barber> barber = barberRepository.findByCpf(cpf);
        return barber.orElseGet(() -> clientRepository.findByCpf(cpf).orElse(null));
    }
}
