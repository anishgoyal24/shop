package com.app.shop.repository.customer;

import com.app.shop.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    public List<Cart> findByPartyDetailsPartyId(Integer partyId);

    public Cart findByPartyDetailsPartyIdAndItemPackingDetailsId(Integer partyId, Integer id);
}
