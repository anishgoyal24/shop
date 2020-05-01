import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }


  addToCart(cart: any){
    return this.http.post(environment.BASE_URL_API + '/cart/add', cart).toPromise();
  }

  getCart(id: any, state: any){
    var params = new HttpParams().set("id", id).set("state", state);
    return this.http.get(environment.BASE_URL_API + '/cart/get', {
      params: params
    }).toPromise();
  }

}
