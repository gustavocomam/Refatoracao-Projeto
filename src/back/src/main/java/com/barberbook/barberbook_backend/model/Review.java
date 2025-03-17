package com.barberbook.barberbook_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id", nullable = true)
    private Integer clientId;

    @Column(name = "barber_id", nullable = false)
    private Integer barberId;

    @Column(name = "comment", nullable = false)
    private String comment;

    @Column(name = "review_date", nullable = false)
    private String reviewDate;

    @Column(name = "stars", nullable = false)
    private int stars;

    // 🔹 Construtor privado
    private Review(Integer clientId, Integer barberId, String comment, String reviewDate, int stars) {
        this.clientId = clientId;
        this.barberId = barberId;
        this.comment = comment;
        this.reviewDate = reviewDate;
        this.stars = stars;
    }

    // 🔹 Método Factory
    protected static Review create(Integer clientId, Integer barberId, String comment, String reviewDate, int stars) {
        return new Review(clientId, barberId, comment, reviewDate, stars);
    }

    // Getters
    public Long getId() { return id; }
    public Integer getClientId() { return clientId; }
    public Integer getBarberId() { return barberId; }
    public String getComment() { return comment; }
    public String getReviewDate() { return reviewDate; }
    public int getStars() { return stars; }
}
