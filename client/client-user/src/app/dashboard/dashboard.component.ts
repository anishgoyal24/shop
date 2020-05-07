import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    const partyId = sessionStorage.getItem("partyId");
    this.cartService.getCartCount(partyId).then((res)=>{
      this.cartService.updateCartNumber(res['data']);
    }).catch((err)=>{
      console.log(err);
    })
  }

}
