import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartNumber:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Add to cart
   * @param cart 
   */
  addToCart(cart: any){
    return this.http.post(environment.BASE_URL_API + '/cart/add', cart).toPromise();
  }


  /**
   * Get cart
   * @param id 
   * @param state 
   */
  getCart(id: any, state: any){
    var params = new HttpParams().set("id", id).set("state", state);
    return this.http.get(environment.BASE_URL_API + '/cart/get', {
      params: params
    }).toPromise();
  }


  /**
   * Update cart item
   * @param cart 
   */
  updateCartItem(cart: any){
    return this.http.post(environment.BASE_URL_API + '/cart/update', cart).toPromise();
  }

  
  /**
   * Get cart number observable
   */
  public getCartNumber(){
    return this.cartNumber.asObservable();
  }


  /**
   * Update Cart number
   * @param number 
   */
  public updateCartNumber(number: any){
    this.cartNumber.next(number);
  }

  getCartCount(partyId: any){
    return this.http.get(environment.BASE_URL_API + '/cart/count', {
      params: new HttpParams().set("partyId", partyId)
    }).toPromise();
  }


}
