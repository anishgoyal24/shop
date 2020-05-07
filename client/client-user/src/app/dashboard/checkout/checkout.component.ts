import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { CartService } from 'src/shared/services/cart.service';
import { OrdersService } from 'src/shared/services/orders.service'
import { UserService } from 'src/shared/services/user.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) { }



  // Order Header Object
  orderHeader = {
    partyDetails: {
      partyId: null
    },
    paymentMode: "Cash on Delivery (COD)",
    orderDetails: [],
    totalCost: 0
  }


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

  customerDiscount: number;

  discountedPrice: number;

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
          this.discountedPrice = ((100-this.customerDiscount)/100) * this.totalValue;
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
          console.log(res['data']);
          this.address = res['data']['address'];
          this.pincode = res['data']['pincode'];
          this.city = res['data']['city'];
          this.customerDiscount = res['data']['discount'];
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


  placeOrder(){
    // Order Details Class
  class OrderDetails {
    itemDetails: any;
    quantity: number;
    actualCost: number;
    discountedCost: number;

    constructor(){
      this.itemDetails = new Object();
    }
  };

    try {
      // Create Order header object
      this.orderHeader.partyDetails.partyId = this.partyId;
      this.orderHeader.totalCost = this.discountedPrice;
      for (var item of this.cartItems){
        var orderDetails = new OrderDetails();
        orderDetails.itemDetails.id = item.item.itemPackingDetails.id;
        orderDetails.quantity = item.item.quantity;
        orderDetails.actualCost = item.item.price;
        orderDetails.discountedCost = item.item.price;
        this.orderHeader.orderDetails.push(orderDetails);
      }

      // Call API
      this.utilityService.asyncNotification("Placing Order...", new Promise((resolve, reject)=>{
        this.ordersService.placeOrder(this.orderHeader).then((res)=>{
          if (res['message']=="success"){
            this.cartService.getCartCount(this.partyId).then((res)=>{
              this.cartService.updateCartNumber(res['data']);
            })
            resolve(this.utilityService.resolveAsyncPromise("Successfully Placed Order!"));
            this.router.navigate(['dashboard', 'orders']);
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("Some error occurred while placing the order. Please try again later!"));
        })
      }))
      
    } catch (error) {
      console.log(error)
      this.utilityService.errorNotification("Some error occurred while placing the order. Please try again later!");
    }
  }

}
