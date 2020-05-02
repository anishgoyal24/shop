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

}
