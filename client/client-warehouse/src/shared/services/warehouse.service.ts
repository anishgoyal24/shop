import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private _http: HttpClient, private httpClient: HttpClient) { }

  /**
   * Authenticate user and retrieve a token to store on client side.
   * 
   * @param userData 
   */
  authenticate(userData: any){
    return this._http.post(environment.BASE_URL_API + '/user/authenticate', userData, {
      responseType: 'text',
      observe: 'response'
    }).toPromise()
  }

  /**
   * Get warehouse details
   * @param email 
   */
  getDetails(email: string){
    return this.httpClient.get(environment.BASE_URL_API + '/warehouse/details-email', {
      params: {
        email: email
      }
    }).toPromise();
  }

  
  /**
   * Fetch dynamic warehouses linked to static warehouse
   * @param warehouseId 
   */
  getDynamicWarehouse(warehouseId: any){
    let params = new HttpParams().set("warehouseId", warehouseId);
    return this.httpClient.get(environment.BASE_URL_API + '/warehouse/dynamic', {
      params: params
    }).toPromise();
  }
}
