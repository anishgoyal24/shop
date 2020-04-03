import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss']
})
export class ProductsHomeComponent implements OnInit {

  constructor(private productService: ProductService) { }

  public products: any = [];
  public productsLength = this.products.length || 0;

  async ngOnInit() {
  //  this.products = await this.getAllProducts();
  }

  /**
   * Fetches all the products from the server
   */
  getAllProducts(){
    return new Promise((resolve, reject)=>{
      this.productService.getAllProducts()
      .then((res)=> resolve(res['data']))
      .catch(()=> reject([]))
    })
  }

}
