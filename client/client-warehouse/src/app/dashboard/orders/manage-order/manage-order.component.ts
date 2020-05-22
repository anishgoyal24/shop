import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { OrderService } from 'src/shared/services/order.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private utilityService: UtilityService
  ) { }

  orderItems: any = [];

  warehouseId: string;

  page: number = 0;

  moreToLoad: boolean = true;

  ngOnInit() {
    this.warehouseId = sessionStorage.getItem("warehouseId");
    this.loadOrders()
  }

  loadOrders(){
    try {
      this.utilityService.asyncNotification("Fetching orders...", new Promise((resolve, reject)=>{
        this.orderService.getOrders(this.warehouseId, this.page)
        .then((res)=>{
          if (res['message']=='success'){
            if (res['data'].length>0){
              this.moreToLoad = true;
              this.orderItems = this.orderItems.concat(res['data']);
              resolve(this.utilityService.resolveAsyncPromise("Fetched Orders!"));
            }
            else{
              this.moreToLoad = false;
              resolve(this.utilityService.rejectAsyncPromise("No more orders to display!"));
            }
          }
          else{
            reject(this.utilityService.rejectAsyncPromise("Unable to fetch orders!"));
          }
        }).catch(()=>{
          reject(this.utilityService.rejectAsyncPromise("Unable to fetch orders!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("Oops some error occured!");
    }
  }


  nextPage(){
    this.page++;
    this.loadOrders();
  }

}
