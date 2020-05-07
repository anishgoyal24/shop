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

  /**
   * Get names of warehouse
   */
  getWarehouseList(){
    return this._http.get(environment.BASE_URL_API + '/warehouse/get-name').toPromise();
  }


  /**
   * Get details of a warehouse
   * @param warehouseId 
   */
  getWarehouseDetails(warehouseId: any){
    let params = new HttpParams().set("warehouseId", warehouseId);
    return this._http.get(environment.BASE_URL_API + '/warehouse/details', {params: params}).toPromise();
  }

  /**
   * Edit warehouse details
   * @param warehouseDetails 
   */
  editWarehouse(warehouseDetails: any){
    return this._http.post(environment.BASE_URL_API + '/warehouse/updatedetails', warehouseDetails).toPromise();
  }

  /**
   * Get list of static warehouse by state
   * @param state 
   */
  getWarehouseListByState(state: any){
    var params = new HttpParams().set("state", state);
    return this._http.get(environment.BASE_URL_API + '/warehouse/by-state', {
      params: params
    }).toPromise();
  }

  /**
   * Search a warehouse
   * @param query 
   */
  search(query: string){
    var params = new HttpParams().set("email", query);
    return this._http.get(environment.BASE_URL_API + '/warehouse/search', {
      params: params
    }).toPromise();
  }

}
