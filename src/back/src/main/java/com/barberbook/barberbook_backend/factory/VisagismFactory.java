package com.barberbook.barberbook_backend.factory;

import com.barberbook.barberbook_backend.model.Visagism;

public class VisagismFactory {

    public static Visagism createVisagism(String fotoNome, String recomendacao, String estiloEscolhido) {
        return new Visagism(fotoNome, recomendacao, estiloEscolhido);
    }
}
