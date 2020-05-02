import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  cartItems = [];

  ngOnInit() {
    this.getCart();
  }

  getCart(){
    try {
      const partyId = sessionStorage.getItem("partyId");
      const state = sessionStorage.getItem("state");
      this.utilityService.asyncNotification("Retrieving cart...", new Promise((resolve, reject)=>{
        this.cartService.getCart(partyId, state).then((res)=>{
          if (res['message']=='success'){
            this.cartItems = res['data'];
            resolve(this.utilityService.resolveAsyncPromise("Successfully retrieved cart!"));
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("Unable to retrieve cart details! Please try again later."));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("Some error occurred!");
    }
  }

  
  checkout(){
    this.router.navigate(['dashboard', 'checkout']);
  }

}
