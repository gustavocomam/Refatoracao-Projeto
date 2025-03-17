package com.barberbook.barberbook_backend.factory;

import com.barberbook.barberbook_backend.model.Barber;

public class BarberFactory {

    public static Barber createRegularBarber(String name, Integer barbershopId, String cpf, String password) {
        return new Barber(name, barbershopId, cpf, password, false);
    }

    public static Barber createAdminBarber(String name, Integer barbershopId, String cpf, String password) {
        return new Barber(name, barbershopId, cpf, password, true);
    }
}
