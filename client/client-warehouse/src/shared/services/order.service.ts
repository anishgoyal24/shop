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
  getOrders(warehouseId: any, page: any){
    let params = new HttpParams().set("warehouseId", warehouseId).set("page", page);
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

  /**
   * Fetch open orders
   * @param pincode \
   */
  fetchOpenOrders(warehouseId: string){
    let params = new HttpParams().set("warehouseId", warehouseId);
    return this.http.get(environment.BASE_URL_API + '/warehouse/orders/open', {
      params: params
    }).toPromise();
  }

  /**
   * Get order details from order header
   * @param orderId 
   */
  getOrderDetails(orderId: string){
    let params = new HttpParams().set("orderId", orderId);
    return this.http.get(environment.ORDERS_API + '/order/details', {
      params: params
    }).toPromise();
  }

  /**
   * Accept Order
   * @param body 
   */
  acceptOrder(body: any){
    return this.http.post(environment.ORDERS_API + '/order/accept', body).toPromise();
  }


  /**
   * Change status of order
   * @param body 
   */
  changeStatus(body: any){
    return this.http.post(environment.ORDERS_API + '/order/status', body).toPromise();
  }


  /**
   * Fetch order IDs of a warehouse
   * @param warehouseId 
   */
  getOrderIds(warehouseId: any){
    let params = new HttpParams().set("warehouseId", warehouseId);
    return this.http.get(environment.ORDERS_API + '/order/list/ids', {
      params: params
    }).toPromise();
  }


  /**
   * Close Order
   * @param transferObject 
   */
  transfer(transferObject: any){
    return this.http.post(environment.ORDERS_API + '/order/transfer', transferObject).toPromise();
  }


  /**
   * Close Order
   * @param transferObject 
   */
  closeOrder(transferObject: any){
    return this.http.post(environment.ORDERS_API + '/order/close', transferObject).toPromise();
  }


}
