package com.app.shop.services.customer;

import com.app.shop.entity.PartyDetails;
import com.app.shop.repository.customer.DetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class DetailsService {

    @Autowired
    DetailsRepository detailsRepository;
    HashMap<String, Object> returnObject = new HashMap<>();
    public HashMap<String, Object> addNewUser(PartyDetails partyDetails){
        PartyDetails oldPartyDetails = detailsRepository.findByPartyEmail(partyDetails.getPartyEmail());
        if (oldPartyDetails==null){
            partyDetails.setStatus('n');
            detailsRepository.save(partyDetails);
            returnObject.put("message", "success");
            returnObject.put("data", partyDetails);
        }
        else {
            returnObject.put("message", "user already exists");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    public HashMap<String, Object> updateUserDetails(PartyDetails partyDetails) {
        PartyDetails foundPartyDetails = detailsRepository.findByPartyEmail(partyDetails.getPartyEmail());
        if (foundPartyDetails!=null){
            foundPartyDetails.updateDetails(partyDetails);
            detailsRepository.save(foundPartyDetails);
            returnObject.put("message", "success");
            returnObject.put("data", foundPartyDetails);
        }
        else {
            returnObject.put("message", "failure");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    public HashMap<String, Object> deleteUser(String email) {
        PartyDetails foundPartyDetails = detailsRepository.findByPartyEmail(email);
        if (foundPartyDetails!=null){
            foundPartyDetails.setStatus('n');
            detailsRepository.save(foundPartyDetails);
            returnObject.put("message", "deleted successfully");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }
}
