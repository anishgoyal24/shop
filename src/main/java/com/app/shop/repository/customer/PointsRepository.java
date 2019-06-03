package com.app.shop.repository.customer;

import com.app.shop.entity.PartyPoints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PointsRepository extends JpaRepository<PartyPoints, Double> {

    public PartyPoints findByReferenceId(String id);

    @Query("select sum(order.points) from PartyPoints order where order.partyDetails.partyId=:partyId")
    public int findTotalPoints(@Param("partyId") int partyId);

    public ArrayList<PartyPoints> findByPartyDetailsPartyId(int partyId);
}
