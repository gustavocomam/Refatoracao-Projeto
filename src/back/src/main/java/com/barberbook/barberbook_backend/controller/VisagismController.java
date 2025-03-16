package com.barberbook.barberbook_backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.barberbook.barberbook_backend.service.VisagismService;

@RestController
@RequestMapping("/api/visagism")
@CrossOrigin(origins = "http://localhost:3000")
public class VisagismController {

    @Autowired
    private VisagismService visagismService;

    @PostMapping("/enviarFoto")
    public ResponseEntity<String> enviarFoto(@RequestParam("arquivo") MultipartFile arquivo) {
        try {
            visagismService.processarFoto(arquivo);
            return ResponseEntity.ok("Foto enviada e processada com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erro ao salvar a foto.");
        }
    }

    @GetMapping("/obterRecomendacoes")
    public ResponseEntity<String> obterRecomendacoes(@RequestParam("idFoto") String idFoto) {
        try {
            String recomendacao = visagismService.obterRecomendacaoDeCorteDeCabelo(idFoto);
            return ResponseEntity.ok(recomendacao);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao gerar recomendação: " + e.getMessage());
        }
    }

    @PostMapping("/escolherEstilo")
    public ResponseEntity<String> escolherEstilo(@RequestParam("estilo") String estilo) {
        try {
            visagismService.registrarEscolhaDeEstilo(estilo);
            return ResponseEntity.ok("Estilo escolhido com sucesso: " + estilo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar o estilo.");
        }
    }
}
