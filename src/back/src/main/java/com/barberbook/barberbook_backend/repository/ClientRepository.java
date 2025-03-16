package com.barberbook.barberbook_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.barberbook.barberbook_backend.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    Optional<Client> findByCpf(String cpf);

    @Query("SELECT c FROM Client c WHERE c.cpf = :cpf AND c.password = :password")
    Optional<Client> findByCpfAndPassword(@Param("cpf") String cpf, @Param("password") String password);

}