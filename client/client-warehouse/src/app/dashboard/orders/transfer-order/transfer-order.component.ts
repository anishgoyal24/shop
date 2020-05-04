import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { WarehouseService } from 'src/shared/services/warehouse.service';
import { OrderService } from 'src/shared/services/order.service';

@Component({
  selector: 'app-transfer-order',
  templateUrl: './transfer-order.component.html',
  styleUrls: ['./transfer-order.component.scss']
})
export class TransferOrderComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private warehouseService: WarehouseService,
    private orderService: OrderService
  ) { }

  transferObject = {
    dynamicWarehouseId: null,
    orderId: null
  }

  dynamicWarehouse = [];

  orderIds = [];

  selectedOrderId: string;

  selectedWarehouse: string;

  ngOnInit() {
    var warehouseId = sessionStorage.getItem("warehouseId");
    this.getDynamicWarehouse(warehouseId);
    this.getOrderIds(warehouseId);
  }


  getDynamicWarehouse(warehouseId: any){
    try {
      this.utilityService.asyncNotification("Fetching Dynamic Warehouses...", new Promise((resolve, reject)=>{
        this.warehouseService.getDynamicWarehouse(warehouseId).then((res)=>{
          if (res['message']=='success'){
            this.dynamicWarehouse = res['data'];
            resolve(this.utilityService.resolveAsyncPromise("Successfully Fetched Dynamic Warehouses!"));
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("There was some error fetching dynamic warehouses!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("There was some error fetching dynamic warehouses!");
    }
  }


  getOrderIds(warehouseId: any){
    try {
      this.utilityService.asyncNotification("Fetching Orders...", new Promise((resolve, reject)=>{
        this.orderService.getOrderIds(warehouseId).then((res)=>{
          if (res['message']=='success'){
            this.orderIds = res['data'];
            resolve(this.utilityService.resolveAsyncPromise("Successfully Fetched Orders!"));
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("There was some error fetching orders!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("There was some error fetching orders!");
    }
  }


  transfer(){
    try {
      this.utilityService.asyncNotification("Transferring Order...", new Promise((resolve, reject)=>{
        this.orderService.transfer(this.transferObject).then((res)=>{
          if (res['message']=='success'){
            const index = this.orderIds.indexOf(this.selectedOrderId);
            if (index>=0){
              this.orderIds.splice(index, 1);
            }
            resolve(this.utilityService.resolveAsyncPromise("Successfully Transferred Order!"));
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("There was some error transferring the order. Please try again!"));
        })
      }))
    } catch (error) {
      this.utilityService.errorNotification("There was some error transferring the order. Please try again!")
    }
  }

}
