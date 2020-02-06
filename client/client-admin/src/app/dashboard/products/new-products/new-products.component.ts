import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private utilityService: UtilityService
  ) { }

  productDetails ={
    itemName: '',
    customerAllowed: '',
    itemPackingDetails:{
      category: ''
    }
  }

  ngOnInit() {
  }

  createNewProduct(productDetails: Object){
    this.utilityService.asyncNotification('Creating New Product', 
    new Promise((resolve, reject)=>{
      this.productService.createNewProduct(productDetails)
      .then(()=>{
        this.utilityService.resolveAsyncPromise('Product Created!')
      })
      .catch(()=>{
        this.utilityService.rejectAsyncPromise('Some error occured, while creating the product!');
      })
    }))
  }

}
