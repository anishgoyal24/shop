package com.app.shop.utils;

import com.app.shop.entity.ItemDetails;
import com.app.shop.entity.ItemPackingDetails;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductDTO {

    private ItemDetails itemDetails;
    private List<ItemPackingDetails> itemPackingDetails;

    public ProductDTO(ItemDetails itemDetails, List<ItemPackingDetails> itemPackingDetails) {
        this.itemDetails = itemDetails;
        this.itemPackingDetails = itemPackingDetails;
    }
}
