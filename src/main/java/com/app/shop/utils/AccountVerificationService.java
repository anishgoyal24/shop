package com.app.shop.utils;

import com.app.shop.entity.HashTable;
import com.app.shop.repository.common.HashRepository;
import com.app.shop.services.customer.CustomerDetailsService;
import com.app.shop.services.employee.EmployeeDetailsService;
import com.app.shop.services.warehouse.WarehouseDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountVerificationService {

    @Autowired
    private HashRepository hashRepository;
    @Autowired
    private EmployeeDetailsService employeeDetailsService;
    @Autowired
    private CustomerDetailsService customerDetailsService;
    @Autowired
    private WarehouseDetailsService warehouseDetailsService;

    public String verifyAccount(String hash, String type){
        HashTable hashTable = hashRepository.findByHash(hash);
        if (hashTable!=null){
            if (type.equals("customer"))
                return customerDetailsService.verify(hashTable.getEmail());
            else if (type.equals("employee"))
                return employeeDetailsService.verify(hashTable.getEmail());
            else if (type.equals("warehouse"))
                return warehouseDetailsService.verify(hashTable.getEmail());
        }
        return "failure";
    }

}
