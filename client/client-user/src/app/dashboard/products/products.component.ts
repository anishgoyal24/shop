import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { OrdersService } from 'src/shared/services/orders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList: any;

  warehousePresent: boolean = false;

  constructor(
    private productService: ProductService,
    private utilityService: UtilityService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.findWarehouseByPincode();
  }

  getProducts(){
    try {
      let type = sessionStorage.getItem("partyType");
      this.utilityService.asyncNotification('Retrieving Products...', new Promise((resolve, reject)=>{
        this.productService.getProducts(type)
        .then((res: any)=>{
          if (res.body['message']="success"){
            this.productsList = res.body['data'];
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

  searchProducts(event: any){
  }

  findWarehouseByPincode(){
    try {
      var pincode = sessionStorage.getItem("pincode");
      this.ordersService.searchWarehouseByPincode(pincode).then((res)=>{
        if (res['count']>0){
          this.warehousePresent=true;
          this.getProducts();
        }
        else this.warehousePresent=false;
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
    
  }

}
