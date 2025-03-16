package com.barberbook.barberbook_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.barberbook.barberbook_backend.model.Barber;

@Repository
public interface BarberRepository extends JpaRepository<Barber, Integer> {

    Optional<Barber> findByCpf(String cpf);

    @Query("SELECT b FROM Barber b WHERE b.barbershop_id = :barbershopId")
    List<Barber> findByBarbershopId(@Param("barbershopId") Integer barbershopId);

    @Query("SELECT b FROM Barber b WHERE b.cpf = :cpf AND b.password = :password")
    Optional<Barber> findByCpfAndPassword(@Param("cpf") String cpf, @Param("password") String password);
}
