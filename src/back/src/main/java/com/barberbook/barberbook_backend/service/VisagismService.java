package com.barberbook.barberbook_backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class VisagismService {

    private static final String UPLOAD_DIR = "uploads/";

    public void processarFoto(MultipartFile arquivo) throws IOException {
        if (arquivo.isEmpty()) {
            throw new IllegalArgumentException("O arquivo está vazio. Por favor, envie uma foto válida.");
        }

        if (!arquivo.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("O arquivo enviado não é uma imagem. Envie um arquivo de imagem válido.");
        }

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(arquivo.getOriginalFilename());
        Files.write(filePath, arquivo.getBytes());

        System.out.println("Foto salva com sucesso em: " + filePath.toString());
    }

    public String obterRecomendacaoDeCorteDeCabelo(String idFoto) {
        return "Recomendação simulada para a foto com ID: " + idFoto;
    }

    public void registrarEscolhaDeEstilo(String estilo) {
        if (estilo == null || estilo.isEmpty()) {
            throw new IllegalArgumentException("Estilo não pode ser vazio.");
        }
        System.out.println("Estilo registrado: " + estilo);
    }
}
