package com.app.shop.controllers.employee;

import com.app.shop.services.employee.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController(value = "/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    public HashMap<String, Object> getList(){
        return categoryService.listAll();
    }

    @PostMapping(value = "/new")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    public HashMap<String, Object> addCategory(@RequestBody String category){
        return categoryService.addCategory(category);
    }

    @PostMapping(value = "/delete")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    public HashMap<String, Object> deleteCategory(@RequestBody String category){
        return categoryService.removeCategory(category);
    }

}
