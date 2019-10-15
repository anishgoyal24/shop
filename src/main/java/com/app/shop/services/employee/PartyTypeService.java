package com.app.shop.services.employee;

import com.app.shop.entity.PartyType;
import com.app.shop.repository.employee.PartyTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class PartyTypeService {

    @Autowired
    private PartyTypeRepository partyTypeRepository;
    private HashMap<String, Object> returnObject;

    public HashMap<String, Object> addPartyType(PartyType partyType){
        returnObject = new HashMap<>();
        PartyType foundPartyType = partyTypeRepository.findByType((partyType.getType()));
        if (foundPartyType==null){
            partyType.setStatus('y');
            partyTypeRepository.save(partyType);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "type already exists");
        return returnObject;
    }

    public HashMap<String, Object> deletePartyType(int id){
        returnObject = new HashMap<>();
        if (partyTypeRepository.findById(id).isPresent()){
            PartyType foundPartyType = partyTypeRepository.findById(id).get();
            foundPartyType.setStatus('n');
            partyTypeRepository.save(foundPartyType);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "no such party type");
        return returnObject;
    }

    public HashMap<String, Object> listAll(){
        returnObject = new HashMap<>();
        List<PartyType> partyTypes = partyTypeRepository.findAll();
        returnObject.put("message", "success");
        returnObject.put("data", partyTypes);
        return returnObject;
    }

    public PartyType getType(Integer id){
        return partyTypeRepository.findById(id).get();
    }
}
