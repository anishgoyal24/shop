package com.app.shop.services.customer;

import com.app.shop.entity.ItemPackingDetails;
import com.app.shop.repository.customer.ItemPackingDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemPackingDetailsService {

    private ItemPackingDetailsRepository itemPackingDetailsRepository;

    @Autowired
    public ItemPackingDetailsService(ItemPackingDetailsRepository itemPackingDetailsRepository) {
        this.itemPackingDetailsRepository = itemPackingDetailsRepository;
    }

//  Get item packing details
    public ItemPackingDetails getDetails(Integer id){
        Optional<ItemPackingDetails> itemPackingDetails = itemPackingDetailsRepository.findById(id);
        if (itemPackingDetails.isPresent())return itemPackingDetails.get();
        return null;
    }

//  Get All
    public List<ItemPackingDetails> getAll(){
        return itemPackingDetailsRepository.findAll();
    }


}
