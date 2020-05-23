package com.app.shop.repository.employee;

import com.app.shop.entity.PartyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartyTypeRepository extends JpaRepository<PartyType, Integer> {

    public PartyType findByType(String type);

    @Query("select partyType from PartyType partyType where lower(partyType.type) like %:query%")
    List<PartyType> search(@Param("query") String query);
}
