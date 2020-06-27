import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-item-cash',
  templateUrl: './order-item-cash.component.html',
  styleUrls: ['./order-item-cash.component.scss']
})
export class OrderItemCashComponent implements OnInit {

  constructor() { }

  @Input('stock') stocks: any;
  @Input('orderDetail') orderDetail: any;

  @Output('delete') delete = new EventEmitter();

  selectedProduct: any;

  quantity = 0;

  totalPrice = 0;

  saveHidden: boolean = false;

  ngOnInit() {
  }

  setItem(stock: any){
    this.orderDetail.itemDetails.id = stock.itemPackingDetails.id;
    this.selectedProduct = stock;
    this.selectedProduct.discountedPrice = this.selectedProduct.price;
  }

 setTotalPrice(){
   this.totalPrice = this.quantity * this.selectedProduct.discountedPrice;
 }

 setOrderDetail(){
   this.orderDetail.actualCost = this.selectedProduct.price;
   this.orderDetail.discountedCost = this.selectedProduct.discountedPrice;
   this.orderDetail.quantity = this.quantity;
 }

 deleteDetail(){
   this.delete.emit();
 }

}
