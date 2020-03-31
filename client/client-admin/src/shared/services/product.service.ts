import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  /**
   * GET request to fetch all the products from the server
   */
  getAllProducts(){
    return this._http.get(environment.BASE_URL_API + '/category/list')
    .toPromise();
  }

  /**
   * 
   * @param productDetails 
   */
  createNewProduct(productDetails: Object){
    return this._http.post(environment.BASE_URL_API + '/product/management/add', productDetails)
    .toPromise();
  }

}
