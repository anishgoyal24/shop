package com.app.shop.repository.common;

import com.app.shop.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StateRepository extends JpaRepository<State, String> {

    List<State> findByCountryCode3(String country);
}
