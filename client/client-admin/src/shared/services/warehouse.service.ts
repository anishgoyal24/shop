import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private _http: HttpClient) { }

  /**
   * POST request to create a new warehouse
   * @param warehouseDetails
   */
  createNewWarehouse(warehouseDetails: Object){
    return this._http.post(environment.BASE_URL_API + '/warehouse/new', warehouseDetails).toPromise();
  }

  getWarehouseList(){
    return this._http.get(environment.BASE_URL_API + '/warehouse/get-name').toPromise();
  }

  getWarehouseDetails(warehouseId: any){
    let params = new HttpParams().set("warehouseId", warehouseId);
    return this._http.get(environment.BASE_URL_API + '/warehouse/details', {params: params}).toPromise();
  }

  editWarehouse(warehouseDetails: any){
    return this._http.post(environment.BASE_URL_API + '/warehouse/updatedetails', warehouseDetails).toPromise();
  }

  getWarehouseListByState(state: any){
    var params = new HttpParams().set("state", state);
    return this._http.get(environment.BASE_URL_API + '/warehouse/by-state', {
      params: params
    }).toPromise();
  }

}
