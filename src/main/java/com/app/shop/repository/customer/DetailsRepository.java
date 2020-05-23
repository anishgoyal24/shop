package com.app.shop.repository.customer;

import com.app.shop.entity.PartyDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailsRepository extends JpaRepository<PartyDetails, Integer> {

    PartyDetails findByPartyEmail(String email);
    PartyDetails findByPartyId(Integer partyId);

    PartyDetails findByPrimaryPhone(String primaryPhone);

    @Query("select party.partyName, party.partyEmail from PartyDetails party where party.partyEmail like %:query% or party.primaryPhone like %:query%")
    List<Object[]> search(@Param("query") String query);
}
