package com.app.shop.entity;


import javax.persistence.*;

@Entity
@Table(name = "party_points")
public class PartyPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private double id;
    @ManyToOne
    @JoinColumn(name = "party_id")
    private PartyDetails partyDetails;
    private int points;
    private String reference;
    @Column(name = "reference_id")
    private String referenceId;

    public double getId() {
        return id;
    }

    public void setId(double id) {
        this.id = id;
    }

    public PartyDetails getPartyDetails() {
        return partyDetails;
    }

    public void setPartyDetails(PartyDetails partyDetails) {
        this.partyDetails = partyDetails;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }
}
