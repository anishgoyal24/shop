package com.app.shop.services.customer;

import com.app.shop.entity.ItemPackingDetails;
import com.app.shop.repository.customer.ItemPackingDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemPackingDetailsService {

    private ItemPackingDetailsRepository itemPackingDetailsRepository;

    @Autowired
    public ItemPackingDetailsService(ItemPackingDetailsRepository itemPackingDetailsRepository) {
        this.itemPackingDetailsRepository = itemPackingDetailsRepository;
    }

//  Get item packing details
    public ItemPackingDetails getDetails(Integer id){
        return itemPackingDetailsRepository.findById(id).get();
    }
}
