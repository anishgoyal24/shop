package com.app.shop.utils;

import com.app.shop.entity.HashTable;
import com.app.shop.repository.common.HashRepository;
import com.app.shop.services.customer.PartyDetailsService;
import com.app.shop.services.employee.EmployeeDetailsService;
import com.app.shop.services.warehouse.WarehouseDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountVerificationService {

    @Autowired
    private HashRepository hashRepository;
    @Autowired
    private PartyDetailsService partyDetailsService;

    public String verifyAccount(String hash){
        HashTable hashTable = hashRepository.findByHash(hash);
        if (hashTable!=null){
            hashRepository.delete(hashTable);
            return partyDetailsService.verify(hashTable.getEmail());
        }
        return "failure";
    }

}
