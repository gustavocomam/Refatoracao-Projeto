
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
    private String review_date;

    @Column(name = "stars", nullable = false)
    private int stars;

    

    public Review() {
    }

    public Review(Integer clientId, Integer barberId, String comment, String review_date, int stars) {
        this.clientId = clientId;
        this.barberId = barberId;
        this.comment = comment;
        this.review_date = review_date;
        this.stars = stars;
        
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getReview_date() {
        return review_date;
    }

    public void setReview_date(String review_date) {
        this.review_date = review_date;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Integer getBarberId() {
        return barberId;
    }

    public void setBarberId(Integer barberId) {
        this.barberId = barberId;
    }

    
}