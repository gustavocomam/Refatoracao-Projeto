package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "visagism")
public class Visagism {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "foto_nome", nullable = false)
    private String fotoNome;

    @Column(name = "recomendacao", length = 1000)
    private String recomendacao;

    @Column(name = "estilo_escolhido")
    private String estiloEscolhido;

    // 🔹 Construtor privado para impedir instanciação direta
    private Visagism(String fotoNome, String recomendacao, String estiloEscolhido) {
        this.fotoNome = fotoNome;
        this.recomendacao = recomendacao;
        this.estiloEscolhido = estiloEscolhido;
    }

    // 🔹 Método Factory para criar instâncias
    protected static Visagism create(String fotoNome, String recomendacao, String estiloEscolhido) {
        return new Visagism(fotoNome, recomendacao, estiloEscolhido);
    }

    // Getters
    public Long getId() { return id; }
    public String getFotoNome() { return fotoNome; }
    public String getRecomendacao() { return recomendacao; }
    public String getEstiloEscolhido() { return estiloEscolhido; }
}
