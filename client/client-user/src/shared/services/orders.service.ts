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


  searchWarehouseByPincode(pincode: any){
    let params = new HttpParams().set("pincode", pincode);
    return this.http.get(environment.ORDERS_API + '/pincode-mapping/check-present', {
      params: params
    }).toPromise();
  }


  placeOrder(orderHeader: any){
    return this.http.post(environment.ORDERS_API + '/order/place', orderHeader).toPromise();
  }

  getOrders(partyId: any, page: any){
    let params = new HttpParams().set("partyId", partyId).set("page", page);
    return this.http.get(environment.ORDERS_API + '/order/list', {
      params: params
    }).toPromise();
  }

}
