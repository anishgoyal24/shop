import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from 'src/shared/services/order.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-open-order-item',
  templateUrl: './open-order-item.component.html',
  styleUrls: ['./open-order-item.component.scss']
})
export class OpenOrderItemComponent implements OnInit {

  @Input() openOrderItem: any;

  @Output() accepted = new EventEmitter<any>();

  constructor(
    private orderService: OrderService,
    private utilityService: UtilityService
  ) { }

  orderDetails = [];

  partyDetails: any;
  
  totalOrderValue: number = 0;

  expanded: boolean = false;

  arrow: string = "keyboard_arrow_down";

  deliveryDate: Date;

  ngOnInit() {
  }

  async toggleExpanded(){
    if (this.arrow=="keyboard_arrow_down"){
      this.arrow = "keyboard_arrow_up";
      this.totalOrderValue = 0;
      await this.getOrderDetails(this.openOrderItem.orderId);
    }
    else this.arrow = "keyboard_arrow_down";
    this.expanded = !this.expanded;
  }

  async getOrderDetails(orderId: string){
    try {
      await this.orderService.getOrderDetails(orderId).then((res)=>{
        if (res['message']=='success'){
          this.orderDetails = res['data'];
          this.partyDetails = res['partyDetails'];
          for (var item of this.orderDetails){
            this.totalOrderValue += item.orderDetail.discountedCost * item.orderDetail.quantity;
          }
        }
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }


  acceptOrder(){
    try {
      var body = {
        warehouseId: sessionStorage.getItem("warehouseId"),
        orderId: this.openOrderItem.orderId,
        expectedDeliveryDate: this.deliveryDate
      }
      this.utilityService.asyncNotification("Accepting Order...", new Promise((resolve, reject)=>{
        this.orderService.acceptOrder(body).then((res)=>{
          if (res['message']=='success'){
            this.accepted.emit(this.openOrderItem);
            resolve(this.utilityService.resolveAsyncPromise("Successfully Accepted Order!"));
          }
          else if (res['message']=='already assigned'){
            reject(this.utilityService.rejectAsyncPromise("This order is already assigned!"));
          }
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise("There was some error accepting the order. Please try again!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("Some error occurred. Please try again later!");
      console.log(error);
    }
  }

}
