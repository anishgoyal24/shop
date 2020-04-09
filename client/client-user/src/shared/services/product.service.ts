import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(type: string){
    let params =new HttpParams().set("type", type);
    return this.http.get(environment.BASE_URL_API + '/product/list', {
      params: params,
      observe: 'response',
      responseType: 'json'
    }).toPromise();
  }
}
