import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: any;

  constructor() { }

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

  expanded: boolean = false;

  arrow: string = "keyboard_arrow_down";

  selectedPacking: any;

  ngOnInit() {
    var partyId = sessionStorage.getItem("partyId");
    this.cartItem.partyDetails.partyId = partyId;
    console.log(this.product);
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

}
