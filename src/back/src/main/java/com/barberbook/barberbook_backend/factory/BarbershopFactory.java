package com.barberbook.barberbook_backend.factory;

import com.barberbook.barberbook_backend.model.Barbershop;

public class BarbershopFactory {

    public static Barbershop createBarbershop(String name, String phone, String address, String instagram) {
        return new Barbershop(name, phone, address, instagram);
    }
}
