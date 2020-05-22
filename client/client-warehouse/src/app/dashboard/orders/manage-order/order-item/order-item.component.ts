import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/shared/services/order.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() orderItem: any;

  showOrderDetails: boolean = true;

  expanded: boolean = false;

  arrow: string = "keyboard_arrow_down";

  orderDetails: any;

  partyDetails: any;

  totalOrderValue: number = 0;

  closedBy: string;

  receivedBy: string;

  constructor(
    private orderService: OrderService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async toggleExpanded(){
    if (this.arrow=="keyboard_arrow_down"){
      this.arrow = "keyboard_arrow_up";
      this.totalOrderValue = 0;
      await this.getOrderDetails(this.orderItem.orderId);
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

  changeStatus(status: string){
    try {
      var body = {
        orderId: this.orderItem.orderId,
        status: status
      };
      this.utilityService.asyncNotification("Changing status...", new Promise((resolve, reject)=>{
        this.orderService.changeStatus(body).then((res)=>{
          if (res['message']=='success'){
            this.orderItem.status = body.status;
            resolve(this.utilityService.resolveAsyncPromise("Successfully changed status!"));
          }
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise("There was some error changing the status. Please try again later!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("There was some error changing the status. Please try again later!")
      console.log(error);
    }
  }

  closeOrder(){
    try {
      var body = {
        orderId: this.orderItem.orderId,
        status: 'Closed',
        receivedBy: this.receivedBy,
        closedBy: this.closedBy
      };
      this.utilityService.asyncNotification("Closing order...", new Promise((resolve, reject)=>{
        this.orderService.closeOrder(body).then((res)=>{
          if (res['message']=='success'){
            this.orderItem.status = body.status;
            resolve(this.utilityService.resolveAsyncPromise("Successfully closed order!"));
          }
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise("There was some error closing the order. Please try again later!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("There was some error closing the order. Please try again later!")
      console.log(error);
    }
  }

}
