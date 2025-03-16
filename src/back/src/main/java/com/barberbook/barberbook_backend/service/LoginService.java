package com.barberbook.barberbook_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberbook.barberbook_backend.repository.BarberRepository;
import com.barberbook.barberbook_backend.repository.ClientRepository;
import com.barberbook.barberbook_backend.model.Client;
import com.barberbook.barberbook_backend.model.Barber;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private BarberRepository barberRepository;

    public Object findUserByCpf(String cpf) {
        Optional<Barber> barber = barberRepository.findByCpf(cpf);
        if (barber.isPresent()) {
            return barber.get();
        }

        Optional<Client> client = clientRepository.findByCpf(cpf);
        return client.orElse(null);
    }

    public Object validateUserByCpfAndPassword(String cpf, String password) {
        Optional<Client> client = clientRepository.findByCpfAndPassword(cpf, password);
        if (client.isPresent()) {
            return client.get();
        }

        Optional<Barber> barber = barberRepository.findByCpfAndPassword(cpf, password);
        return barber.orElse(null);
    }
}
