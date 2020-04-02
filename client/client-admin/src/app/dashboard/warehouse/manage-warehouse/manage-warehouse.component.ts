import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { WarehouseService } from 'src/shared/services/warehouse.service';

@Component({
  selector: 'app-manage-warehouse',
  templateUrl: './manage-warehouse.component.html',
  styleUrls: ['./manage-warehouse.component.scss']
})
export class ManageWarehouseComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.getWarehouseNames();
  }

  getWarehouseNames(){
    this.utilityService.asyncNotification('Fetching Warehouses', 
    new Promise((resolve, reject)=>{
      this.warehouseService.getWarehouseList()
      .then((data)=>{
        resolve(this.utilityService.resolveAsyncPromise('Successfully Fetched Warehouses'));
        console.log(data)
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Some error occured, while fetching the warehouses!'))
      })
    }))
  }

  getWarehouseDetails(warehouseId){
    this.utilityService.asyncNotification('Fetching Warehouse Details', 
    new Promise((resolve, reject)=>{
      this.warehouseService.getWarehouseDetails(warehouseId)
      .then((data)=>{
        resolve(this.utilityService.resolveAsyncPromise('Successfully Fetched Warehouse Details'));
        console.log(data)
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Some error occured, while fetching the warehouse details!'))
      })
    }))
  }

}
