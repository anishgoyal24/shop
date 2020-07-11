import { Component, OnInit, Input } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { OrdersService } from 'src/shared/services/orders.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() orderItem: any;
  
  arrow: string = "keyboard_arrow_down";

  totalOrderValue: number;

  expanded: boolean = false;

  orderDetails: any;

  constructor(
    private utilityService: UtilityService,
    private ordersService: OrdersService
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
      this.ordersService.getOrderDetails(orderId).then((res)=>{
        if (res['message']=='success'){
          this.orderDetails = res['data'];
          for (let item of this.orderDetails){
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


  cancelOrder(){
    try {
      this.utilityService.asyncNotification("Cancelling Order...", new Promise((resolve, reject)=>{
        this.ordersService.cancelOrder(this.orderItem.orderId).then((res)=>{
          if (res['message']=='success'){
            this.orderItem.status = 'Cancelled';
            resolve(this.utilityService.resolveAsyncPromise("Successfully Cancelled Order!"));
          }
          else reject(this.utilityService.rejectAsyncPromise("There was some error cancelling the order!"));
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("There was some error cancelling the order!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("There was some error cancelling the order!");
    }
  }

}
