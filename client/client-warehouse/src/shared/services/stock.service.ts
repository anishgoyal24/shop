import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Both of the variables listed down below are used to share the data through this common service among different components in the app
   * @constant dataSource
   * @constant data 
   */
  private dataSource = new BehaviorSubject<any>({});
  data = this.dataSource.asObservable();

  /**
   * Used to emit the next value of observable so that where this is subscribed, will get the updated value
   * @param data 
   */
  public updateData(data: any){
    this.dataSource.next(data);
  }

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
