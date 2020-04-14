import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Get list of items for dropdown
   */
  getItemsList(){
    return this.httpClient.get(environment.BASE_URL_API + '/stock/getItems').toPromise();
  }


  /**
   * Add stock
   * @param itemStock 
   */
  addStock(itemStock: any){
    return this.httpClient.post(environment.BASE_URL_API + '/stock/add', itemStock).toPromise();
  }

  /**
   * Get stock
   * @param warehouseId 
   */
  getStock(warehouseId: any){
    let params = new HttpParams().set("warehouseId", warehouseId);
    return this.httpClient.get(environment.BASE_URL_API + '/stock/', {
      params: params
    }).toPromise();
  }

  /**
   * Transfer stock
   * @param transferredStock 
   */
  transferStock(transferredStock: any){
    return this.httpClient.post(environment.BASE_URL_API + '/stock/transfer', transferredStock).toPromise();
  }

}
