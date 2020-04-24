import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PincodeMappingService {

  constructor(
    private http: HttpClient
  ) { }

  addMapping(pincodeWarehouseMapping: any){
    return this.http.post(environment.ORDERS_API + '/pincode-mapping/new', pincodeWarehouseMapping).toPromise();
  }

  getFirst10Mappings(){
    return this.http.get(environment.ORDERS_API + '/pincode-mapping/first10').toPromise();
  }

  getNext10Mappings(id: any){
    var params = new HttpParams().set("id", id);
    return this.http.get(environment.ORDERS_API + '/pincode-mapping/next10', {
      params: params
    }).toPromise();
  }

  search(pincode: any){
    var params = new HttpParams().set("pincode", pincode);
    return this.http.get(environment.ORDERS_API + '/pincode-mapping/search', {
      params: params
    }).toPromise();
  }

  toggleEnabled(id: any){
    return this.http.post(environment.ORDERS_API + '/pincode-mapping/toggle', id).toPromise();
  }

}
