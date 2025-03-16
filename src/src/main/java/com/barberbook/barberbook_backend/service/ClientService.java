package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.model.Client;
import com.barberbook.barberbook_backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public Client findClientById(int id) {
        return clientRepository.findById(id).orElse(null);
    }

    public void deleteClient(int id) {
        clientRepository.delete(findClientById(id));
    }

    public Iterable<Client> findAllClients() {
        return clientRepository.findAll();
    }
}