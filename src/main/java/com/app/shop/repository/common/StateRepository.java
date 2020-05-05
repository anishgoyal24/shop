package com.app.shop.repository.common;

import com.app.shop.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StateRepository extends JpaRepository<State, String> {

    @Query("select state from State state where state.countryCode3.countryCode3=:country")
    List<State> findByCountryCode3(@Param("country") String country);
}
