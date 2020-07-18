import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { Router } from '@angular/router'
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private utilityService: UtilityService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
  ) { }

  cartItems = [];

  partyId: string;

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
    this.getCart();
  }

  getCart(){
    try {
      this.partyId = sessionStorage.getItem("partyId");
      const state = sessionStorage.getItem("state");
      this.utilityService.asyncNotification("Retrieving cart...", new Promise((resolve, reject)=>{
        this.cartService.getCart(this.partyId, state).then((res)=>{
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

  deleteCartItem(cartItem: any){
    const index = this.cartItems.indexOf(cartItem, 0);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    try {
      this.cartService.getCartCount(this.partyId).then((res)=>{
        this.cartService.updateCartNumber(res['data']);
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

}
