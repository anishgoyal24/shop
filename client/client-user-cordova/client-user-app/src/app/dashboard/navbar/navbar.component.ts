import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  cartNumber: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { 
    this.cartService.getCartNumber().subscribe(cartNumber => this.cartNumber = cartNumber);
  }

  ngOnInit() {
  }

  signout(){
    sessionStorage.clear();
    this.router.navigate(['home']);
  }

  openCart(){
    this.router.navigate(['dashboard', 'cart']);
  }

}
