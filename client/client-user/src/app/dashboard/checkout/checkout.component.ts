import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { CartService } from 'src/shared/services/cart.service';
import { OrdersService } from 'src/shared/services/orders.service'
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private ordersService: OrdersService,
    private cartService: CartService,
    private userService: UserService
  ) { }

  cartItems: any;

  partyId: Number;

  state: string;

  totalValue: number = 0;

  address: string;

  country: string;

  pincode: string;

  city: string;

  partyName: string;

  primaryPhone: string;

  ngOnInit() {
    this.partyId = Number(sessionStorage.getItem("partyId"));
    this.state = sessionStorage.getItem("state");
    this.partyName = sessionStorage.getItem("partyName");
    this.getCartDetails();
    this.getUserDetails();
  }


  getCartDetails(){
    try {
      this.cartService.getCart(this.partyId, this.state).then((res)=>{
        if (res['message']=='success'){
          this.cartItems = res['data'];
          for (let cartItem of this.cartItems){
            this.totalValue += cartItem.item.price * cartItem.item.quantity;
          }
        }
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  getUserDetails(){
    try {
      var partyEmail = sessionStorage.getItem("partyEmail");
      this.userService.getDetails(partyEmail).then((res)=>{
        if (res['message']=='success'){
          this.address = res['data']['address'];
          this.pincode = res['data']['pincode'];
          this.city = res['data']['city'];
          this.primaryPhone = res['data']['primaryPhone'];
          this.country = res['data']['country']['countryName'] + '-' + res['data']['country']['countryCode3'];
          this.state = res['data']['state']['stateName'] + '-' + res['data']['state']['stateCode3'];
        }
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

}
