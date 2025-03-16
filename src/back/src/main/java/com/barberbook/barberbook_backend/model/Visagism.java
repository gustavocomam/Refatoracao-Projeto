package com.barberbook.barberbook_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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

    public Visagism() {}

    public Visagism(String fotoNome, String recomendacao, String estiloEscolhido) {
        this.fotoNome = fotoNome;
        this.recomendacao = recomendacao;
        this.estiloEscolhido = estiloEscolhido;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFotoNome() {
        return fotoNome;
    }

    public void setFotoNome(String fotoNome) {
        this.fotoNome = fotoNome;
    }

    public String getRecomendacao() {
        return recomendacao;
    }

    public void setRecomendacao(String recomendacao) {
        this.recomendacao = recomendacao;
    }

    public String getEstiloEscolhido() {
        return estiloEscolhido;
    }

    public void setEstiloEscolhido(String estiloEscolhido) {
        this.estiloEscolhido = estiloEscolhido;
    }
}
