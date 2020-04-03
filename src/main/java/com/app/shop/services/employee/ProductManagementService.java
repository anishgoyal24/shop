package com.app.shop.services.employee;

import com.app.shop.entity.Category;
import com.app.shop.entity.ItemDetails;
import com.app.shop.entity.ItemPackingDetails;
import com.app.shop.repository.employee.PackingRepository;
import com.app.shop.repository.employee.ProductManagementRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ProductManagementService {

    private ProductManagementRepository productManagementRepository;
    HashMap<String, Object> returnObject;
    private CategoryService categoryService;
    private PackingRepository packingRepository;

    @Autowired
    public ProductManagementService(ProductManagementRepository productManagementRepository, CategoryService categoryService, PackingRepository packingRepository) {
        this.productManagementRepository = productManagementRepository;
        this.categoryService = categoryService;
        this.packingRepository = packingRepository;
    }

    public HashMap<String, Object> addProduct(String itemDetail, MultipartFile image) {
        returnObject = new HashMap<>();
        ItemDetails itemDetails = null;
        Gson gson = new Gson();
        itemDetails = gson.fromJson(itemDetail, ItemDetails.class);
        if (productManagementRepository.findByItemNameIgnoreCase(itemDetails.getItemName())==null) {
            itemDetails.setStatus('y');
            if (itemDetails.getItemPackingDetails()!=null){
                for(ItemPackingDetails itemPackingDetails : itemDetails.getItemPackingDetails()) {
                    itemPackingDetails.setStatus('y');
                    itemPackingDetails.setItemDetails(itemDetails);
                }
            }
            Set<Category> categoryList = new HashSet<>();
            if (itemDetails.getCategories()!=null){
                for (Category category : itemDetails.getCategories()) {
                    Category cat = categoryService.getCategory(category.getId());
                    categoryList.add(cat);
                    cat.getItemDetails().add(itemDetails);
                }
            }
            itemDetails.setCategories(categoryList);
            itemDetails.setImage(itemDetails.getItemName().toLowerCase().replaceAll("\\s", ""));
            productManagementRepository.save(itemDetails);
            uploadImage(image, itemDetails.getItemName().toLowerCase().replaceAll("\\s", ""));
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> deleteProduct(int itemId){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findById(itemId);
        if (foundItemDetails!=null){
            foundItemDetails.setStatus('n');
            for (ItemPackingDetails itemPackingDetails: foundItemDetails.getItemPackingDetails())
                itemPackingDetails.setStatus('n');
            productManagementRepository.save(foundItemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;

    }

    public HashMap<String, Object> addPacking(ItemDetails itemDetails){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findById(itemDetails.getItemId());
        if (foundItemDetails!=null){
            for (ItemPackingDetails itemPackingDetails : itemDetails.getItemPackingDetails()) {
                itemPackingDetails.setStatus('y');
                foundItemDetails.getItemPackingDetails().add(itemPackingDetails);
                itemPackingDetails.setItemDetails(foundItemDetails);
            }
            productManagementRepository.save(foundItemDetails);
            packingRepository.saveAll(itemDetails.getItemPackingDetails());
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure" + itemDetails.getItemId());
        return returnObject;
    }

    public HashMap<String, Object> deletePacking(ItemDetails itemDetails){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findById(itemDetails.getItemId());
        if (foundItemDetails!=null){
            for (ItemPackingDetails itemPackingDetails : foundItemDetails.getItemPackingDetails()){
                if (itemPackingDetails.getSize() == itemDetails.getItemPackingDetails().get(0).getSize())
                    itemPackingDetails.setStatus('n');
            }
            productManagementRepository.save(foundItemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> listProducts(){
        returnObject = new HashMap<>();
        List<ItemDetails> itemDetailsList =  productManagementRepository.findAll();
        returnObject.put("data", itemDetailsList);
        return returnObject;
    }

    private String uploadImage(MultipartFile image, String name){
        if (image.isEmpty())return "failure";
        try{
            byte[] bytes = image.getBytes();
            String UPLOADED_FOLDER="src/main/resources/static/images/";
            Path path = Paths.get(UPLOADED_FOLDER + name + ".jpg");
            Files.write(path, bytes);
            return "success";
        }
        catch (Exception e){
            return "Exception failure"+e+" ";
        }
    }

    public HashMap<String, Object> updateProduct(ItemDetails itemDetails){
        returnObject = new HashMap<>();
        ItemDetails found = productManagementRepository.findById(itemDetails.getItemId());
        if (found!=null){
            found.setCustomerAllowed(itemDetails.getCustomerAllowed());
            found.setDescription(itemDetails.getDescription());
            productManagementRepository.save(found);
            returnObject.put("message", "success");
            returnObject.put("data", found);
            return returnObject;
        }
        returnObject.put("message", "no such product exists");
        return returnObject;
    }

    public HashMap<String, Object> enablePacking(Integer itemId, Integer packingId){
        returnObject = new HashMap<>();
        ItemDetails found = productManagementRepository.findById(itemId).isPresent()?productManagementRepository.findById(itemId).get():null;
        if (found!=null){
            for (ItemPackingDetails itemPackingDetails: found.getItemPackingDetails()) {
                if (itemPackingDetails.getId() == packingId)
                    itemPackingDetails.setStatus('y');
            }
            productManagementRepository.save(found);
            returnObject.put("message", "success");
            return returnObject;
        }
        returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> addCategory(Integer itemId, Integer categoryId) {
        returnObject = new HashMap<>();
        ItemDetails found = productManagementRepository.findById(itemId).isPresent()?productManagementRepository.findById(itemId).get():null;
        Category foundCategory = categoryService.getCategory(categoryId);
        if (found!=null && foundCategory!=null){
            foundCategory.getItemDetails().add(found);
            found.getCategories().add(foundCategory);
            productManagementRepository.save(found);
            categoryService.saveCategory(foundCategory);
            returnObject.put("message", "success");
            return returnObject;
        }
        returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> removeCategory(Integer itemId, Integer categoryId) {
        returnObject = new HashMap<>();
        ItemDetails found = productManagementRepository.findById(itemId).isPresent()?productManagementRepository.findById(itemId).get():null;
        Category foundCategory = categoryService.getCategory(categoryId);
        if (found!=null && foundCategory!=null){
            found.getCategories().remove(foundCategory);
            foundCategory.getItemDetails().remove(found);
            productManagementRepository.save(found);
            categoryService.saveCategory(foundCategory);
            returnObject.put("message", "success");
            return returnObject;
        }
        returnObject.put("message", "failure");
        return returnObject;
    }
}
