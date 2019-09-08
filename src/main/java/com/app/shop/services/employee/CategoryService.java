package com.app.shop.services.employee;

import com.app.shop.entity.Category;
import com.app.shop.repository.employee.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    private HashMap<String, Object> returnObject;

    public HashMap<String, Object> addCategory(String cat){
        returnObject = new HashMap<>();
        Category category = new Category();
        category.setCategory(cat);
        category.setStatus('y');
        categoryRepository.save(category);
        returnObject.put("message", "success");
        return returnObject;
    }

    public HashMap<String, Object> removeCategory(String cat){
        returnObject = new HashMap<>();
        Category foundCategory = categoryRepository.findByCategory(cat);
        if (foundCategory!=null){
            foundCategory.setStatus('n');
            categoryRepository.save(foundCategory);
            returnObject.put("message", "success");
        }
        else returnObject.put("message", "no such category");
        return returnObject;
    }

    public HashMap<String, Object> listAll(){
        returnObject = new HashMap<>();
        List<Category> categories = categoryRepository.findByStatus('y');
        returnObject.put("message", "success");
        returnObject.put("data", categories);
        return returnObject;
    }
}
