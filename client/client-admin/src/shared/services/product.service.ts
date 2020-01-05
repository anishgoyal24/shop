import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

}
