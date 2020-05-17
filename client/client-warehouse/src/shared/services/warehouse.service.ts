import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  _http: HttpClient;

  constructor(handler: HttpBackend, private httpClient: HttpClient) {
    /**
     * HTTP Backend to skip auth interception with Authorization Header
     */
    this._http = new HttpClient(handler);
   }

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


  /**
   * Change password of a warehouse
   * @param object 
   */
  changePassword(object: Object){
    return this.httpClient.post(environment.BASE_URL_API + '/warehouse/changepassword', object).toPromise();
  }


  /**
   * Reset password
   * @param email 
   */
  forgotPassword(email: string){
    return this._http.post(environment.BASE_URL_API + '/warehouse/forgotpassword', email).toPromise();
  }


  checkPincodesServicable(warehouseId: string, pincode: string){
    return this.httpClient.get(environment.ORDERS_API + '/pincode-mapping/check', {
      params: new HttpParams().set("warehouseId", warehouseId).set("pincode", pincode)
    }).toPromise();
  }
}
