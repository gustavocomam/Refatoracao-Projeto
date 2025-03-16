package com.barberbook.barberbook_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.barberbook.barberbook_backend.repository")
@EntityScan(basePackages = "com.barberbook.barberbook_backend.model")
public class BarberbookBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BarberbookBackendApplication.class, args);
	}
}