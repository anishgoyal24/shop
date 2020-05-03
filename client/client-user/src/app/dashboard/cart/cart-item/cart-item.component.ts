import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private cartService: CartService
  ) { }

  @Input() cartItem: any;

  @Output() deleteCart = new EventEmitter<any>();

  totalPrice: Number = 0;

  ngOnInit() {
    console.log(this.cartItem);
    this.totalPrice = this.cartItem.item.quantity * this.cartItem.item.price;
  }

  delete(){
    try {
      this.utilityService.asyncNotification("Deleting item from cart...", new Promise((resolve, reject)=>{
        this.cartService.updateCartItem(this.cartItem.item).then((res)=>{
          if (res['message']=='success'){
            resolve(this.utilityService.resolveAsyncPromise("Successfully Deleted Item from cart!"));
            this.deleteCart.emit(this.cartItem);
          }
          else{
            reject(this.utilityService.rejectAsyncPromise("There was some error in deleting item from your cart!"));
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("There was some error in deleting item from your cart!"));
          console.log(err);
        })
      }))
    } catch (error) {
      console.log(error);
    }
  }

  updateCart(){
    try {
      this.utilityService.asyncNotification("Deleting item from cart...", new Promise((resolve, reject)=>{
        this.cartService.updateCartItem(this.cartItem.item).then((res)=>{
          if (res['message']=='success'){
            this.cartItem.item = res['data'];
            this.calcTotalPrice();
            resolve(this.utilityService.resolveAsyncPromise("Successfully Updated Item from cart!"));
          }
          else{
            reject(this.utilityService.rejectAsyncPromise("There was some error in updating your cart!"));
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("There was some error in updating your cart!"));
          console.log(err);
        })
      }))
    } catch (error) {
      console.log(error);
    }
  }

  increment(){
    this.cartItem.item.quantity++;
    this.calcTotalPrice();
  }

  decrement(){
    if (this.cartItem.item.quantity!=0){
      this.cartItem.item.quantity--;
      this.calcTotalPrice();
    }
  }

  calcTotalPrice(){
    this.totalPrice = this.cartItem.item.quantity * this.cartItem.item.price;
  }

}
