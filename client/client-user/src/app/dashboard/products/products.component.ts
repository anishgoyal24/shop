import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList: any;

  constructor(
    private productService: ProductService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    try {
      let type = sessionStorage.getItem("partyType");
      this.utilityService.asyncNotification('Retrieving Products...', new Promise((resolve, reject)=>{
        this.productService.getProducts(type)
        .then((res: any)=>{
          if (res.body['message']="success"){
            this.productsList = res.body['data'];
            console.log(this.productsList);
            resolve(this.utilityService.resolveAsyncPromise('Products successfully retrieved!'));
          }
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise('Error fetching Products!'));
        })
      }))
    } catch (error) {
      console.log(error);
    }
  }

  searchProducts(){

  }

}
