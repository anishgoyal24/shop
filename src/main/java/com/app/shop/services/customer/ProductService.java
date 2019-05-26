package com.app.shop.services.customer;

import com.app.shop.entity.ItemDetails;
import com.app.shop.repository.customer.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ItemDetails> searchItem(String searchQuery){
        return productRepository.findByItemNameContainingIgnoreCase(searchQuery);
    }
}
