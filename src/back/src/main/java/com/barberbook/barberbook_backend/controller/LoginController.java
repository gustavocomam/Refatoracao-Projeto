package com.barberbook.barberbook_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.barberbook.barberbook_backend.service.LoginService;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    // Endpoint para buscar o usuário por CPF
    @GetMapping("/{cpf}")
    public Object login(@PathVariable String cpf) {
        return loginService.findUserByCpf(cpf);
    }

    // Endpoint para validar o CPF e a senha
    @GetMapping("/{cpf}/{password}")
    public Object loginWithPassword(@PathVariable String cpf, @PathVariable String password) {
        return loginService.validateUserByCpfAndPassword(cpf, password);
    }
}
