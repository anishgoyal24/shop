package com.app.shop.repository.customer;

import com.app.shop.entity.PartyDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DetailsRepository extends JpaRepository<PartyDetails, Integer> {
    PartyDetails findByPartyEmail(String email);
}
