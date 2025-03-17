package com.barberbook.barberbook_backend.factory;

import com.barberbook.barberbook_backend.model.Services;
import java.math.BigDecimal;

public class ServicesFactory {

    public static Services createService(String name, BigDecimal servicePrice, boolean serviceType, Integer barberId) {
        return new Services(name, servicePrice, serviceType, barberId);
    }
}
