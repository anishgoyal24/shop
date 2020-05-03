import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { OrderService } from 'src/shared/services/order.service';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private orderService: OrderService
  ) { }

  openOrders = [];

  ngOnInit() {
    let warehouseId = sessionStorage.getItem("warehouseId");
    this.fetchOpenOrders(warehouseId);
  }

  fetchOpenOrders(warehouseId: any){
    try {
      this.utilityService.asyncNotification("Fetching Open Orders...", new Promise((resolve, reject)=>{
        this.orderService.fetchOpenOrders(warehouseId).then((res)=>{
          console.log(res);
          this.openOrders = res['data'];
          resolve(this.utilityService.resolveAsyncPromise("Successfully fetched open orders!"));
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise("There was some error fetching open orders!"));
        })
      }))
    } catch (error) {
      console.log(error);
        this.utilityService.errorNotification("There was some error fetching open orders!");
    }
  }


  deleteFromList(openOrder: any){
    const index = this.openOrders.indexOf(openOrder, 0);
    if (index > -1) {
      this.openOrders.splice(index, 1);
    }
  }

}
