import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { OrdersService } from 'src/shared/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private ordersService: OrdersService
  ) { }

  orderItems = [];

  partyId: any;

  page: number = 0;

  ngOnInit() {
    this.partyId = sessionStorage.getItem("partyId");
    this.getOrders(this.partyId, this.page);
  }

  getOrders(partyId: any, page: number){
    try {
      this.utilityService.asyncNotification("Fetching your orders...", new Promise((resolve, reject)=>{
        this.ordersService.getOrders(partyId, page).then((res)=>{
          if (res['message']=='success'){
            this.orderItems = res['data'];
            console.log(this.orderItems)
            resolve(this.utilityService.resolveAsyncPromise("Successfully Retrieved Orders!"));
          }
          else reject(this.utilityService.rejectAsyncPromise("There was some error while fetching the orders!"));
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("There was some error while fetching the orders!"));
          console.log(err);
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("There was some error while fetching the orders!");
      console.log(error);
    }
  }

  next(){
    this.page++;
    this.getOrders(this.partyId, this.page);
  }

}
