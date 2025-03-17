package com.barberbook.barberbook_backend.factory;

import com.barberbook.barberbook_backend.model.Client;

public class ClientFactory {

    public static Client createClient(String name, Integer barbershopId, String cpf, String password) {
        return new Client(name, barbershopId, cpf, password);
    }
}
