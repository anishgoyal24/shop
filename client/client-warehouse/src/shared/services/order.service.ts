import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Get first 10 orders of a warehouse
   * @param warehouseId 
   */
  getOrders(warehouseId: any){
    let params = new HttpParams().set("warehouseId", warehouseId);
    return this.http.get(environment.BASE_URL_API + '/warehouse/orders/getorders', {
      params: params
    }).toPromise();
  }


  /**
   * Get next 10 orders of a warehouse
   * @param warehouseId 
   * @param lastOrderId 
   */
  getNextOrders(warehouseId: any, lastOrderId: any){
    let params = new HttpParams();
    params = params.set("warehouseId", warehouseId);
    params = params.set("lastOrderId", lastOrderId);
    return this.http.get(environment.BASE_URL_API + '/warehouse/orders/getorders/next', {
      params: params
    }).toPromise();
  }


}
