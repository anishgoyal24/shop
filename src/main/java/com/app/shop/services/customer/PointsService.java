package com.app.shop.services.customer;

import com.app.shop.entity.PartyPoints;
import com.app.shop.repository.customer.PointsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class PointsService {

    @Autowired
    private PointsRepository pointsRepository;
    private HashMap<String, Object> returnObject;

    public HashMap<String, Object> seeHistory(int partyId){
        returnObject = new HashMap<>();
        ArrayList<PartyPoints> history = pointsRepository.findByPartyDetailsPartyId(partyId);
        if (history!=null){
            returnObject.put("message", "success");
            returnObject.put("history", history);
            returnObject.put("points left", pointsRepository.findTotalPoints(partyId));
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> addTransaction(PartyPoints partyPoints){
        returnObject = new HashMap<>();
        PartyPoints foundPartyPoints = pointsRepository.findByReferenceId(partyPoints.getReferenceId());
        if (foundPartyPoints==null){
            pointsRepository.save(partyPoints);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> getPoints(int partyId){
        returnObject = new HashMap<>();
        int points = pointsRepository.findTotalPoints(partyId);
        returnObject.put("message", "success");
        returnObject.put("data", points);
        return returnObject;
    }
}
