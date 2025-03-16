package com.barberbook.barberbook_backend.service;

import com.barberbook.barberbook_backend.model.Client;
import com.barberbook.barberbook_backend.repository.ClientRepository;

public class ClientService {

    private static ClientService INSTANCE;
    private final ClientRepository clientRepository;

    private ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public static synchronized ClientService getInstance(ClientRepository repository) {
        if (INSTANCE == null) {
            INSTANCE = new ClientService(repository);
        }
        return INSTANCE;
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public Client findClientById(int id) {
        return clientRepository.findById(id).orElse(null);
    }

    public void deleteClient(int id) {
        clientRepository.delete(findClientById(id));
    }
}
