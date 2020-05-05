import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Search warehouse by pincode
   * @param pincode 
   */
  searchWarehouseByPincode(pincode: any){
    let params = new HttpParams().set("pincode", pincode);
    return this.http.get(environment.ORDERS_API + '/pincode-mapping/check-present', {
      params: params
    }).toPromise();
  }


  /**
   * Place order service function
   * @param orderHeader 
   */
  placeOrder(orderHeader: any){
    return this.http.post(environment.ORDERS_API + '/order/place', orderHeader).toPromise();
  }

  /**
   * Get orders of a party
   * @param partyId 
   * @param page 
   */
  getOrders(partyId: any, page: any){
    let params = new HttpParams().set("partyId", partyId).set("page", page);
    return this.http.get(environment.ORDERS_API + '/order/list', {
      params: params
    }).toPromise();
  }


  /**
   * Get party order details
   * @param orderId 
   */
  getOrderDetails(orderId: string){
    let params = new HttpParams().set("orderId", orderId);
    return this.http.get(environment.ORDERS_API + '/order/party/details', {
      params: params
    }).toPromise();
  }


  /**
   * Cancel order
   * @param orderId 
   */
  cancelOrder(orderId: string){
    return this.http.post(environment.ORDERS_API + '/order/cancel', orderId).toPromise();
  }

}
