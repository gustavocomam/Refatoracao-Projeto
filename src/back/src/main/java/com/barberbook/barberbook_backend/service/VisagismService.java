package com.barberbook.barberbook_backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.web.multipart.MultipartFile;

public class VisagismService {

    private static VisagismService INSTANCE;
    private static final String UPLOAD_DIR = "uploads/";

    private VisagismService() {}

    public static synchronized VisagismService getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new VisagismService();
        }
        return INSTANCE;
    }

    public void processarFoto(MultipartFile arquivo) throws IOException {
        if (arquivo.isEmpty() || !arquivo.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Arquivo inválido.");
        }

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(arquivo.getOriginalFilename());
        Files.write(filePath, arquivo.getBytes());
    }
}
