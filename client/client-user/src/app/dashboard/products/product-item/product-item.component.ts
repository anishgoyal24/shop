import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { CartService } from 'src/shared/services/cart.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private utilityService: UtilityService
  ) { }

  cartItem = {
    partyDetails: {
      partyId: null
    },
    itemPackingDetails: {
      id: 0
    },
    quantity: 0,
    price: 0
  }

  productAvailable:  boolean;

  expanded: boolean = false;

  arrow: string = "keyboard_arrow_down";

  selectedPacking: any;

  ngOnInit() {
    var partyId = sessionStorage.getItem("partyId");
    this.cartItem.partyDetails.partyId = Number(partyId);
  }

  toggleExpanded(){
    this.expanded = !this.expanded;
    if (this.arrow=="keyboard_arrow_down"){
      this.arrow = "keyboard_arrow_up";
    }
    else this.arrow = "keyboard_arrow_down";
  }

  print(){
    console.log(this.cartItem);
  }

  getPriceAndStock(id: any){
    try {
      const pincode = sessionStorage.getItem("pincode");
      const state = sessionStorage.getItem("state");
      this.productService.getPriceAndStock(id, pincode, state).then((res: any)=>{
        if (res['message']=='success'){
          console.log(res);
          this.cartItem.price = res.price;
          this.productAvailable = true;
        }
        else{
          this.productAvailable = false;
        }
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  addToCart(){
    console.log(this.cartItem);
    try {
      this.utilityService.asyncNotification("Adding to cart...", new Promise((resolve, reject)=>{
        this.cartService.addToCart(this.cartItem).then((res)=>{
          if (res['message']=='success'){
            resolve(this.utilityService.resolveAsyncPromise("Successfully added item to cart!"));
          }
          else reject(this.utilityService.rejectAsyncPromise("Error adding item to cart!"));
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("Error adding item to cart!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("Some error occurred!");
    }
  }

}
