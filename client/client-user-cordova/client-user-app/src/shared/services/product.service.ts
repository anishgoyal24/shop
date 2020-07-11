import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Get products
   * @param type party type
   */
  getProducts(type: string){
    let params =new HttpParams().set("type", type);
    return this.http.get(environment.BASE_URL_API + '/product/list', {
      params: params,
      observe: 'response',
      responseType: 'json'
    }).toPromise();
  }

  /**
   * Get item price and stock
   * @param itemId 
   * @param pincode 
   * @param state 
   */
  getPriceAndStock(itemId: any, pincode: any, state: any){
    let params = new HttpParams().set("itemId", itemId).set("pincode", pincode).set("state", state);
    return this.http.get(environment.ORDERS_API + '/product/get-price-stock', {
      params: params
    }).toPromise();
  }


  /**
   * Search products
   * @param searchQuery 
   */
  search(searchQuery: string, type: string){
    return this.http.get(environment.BASE_URL_API + '/product/search', {
      params: new HttpParams().set("searchQuery", searchQuery).set("type", type)
    }).toPromise();
  }

}
