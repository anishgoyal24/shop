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

  warehouses: any;

  warehouse: any

  async ngOnInit() {
    this.warehouses = await this.getWarehouseNames();
    console.log(this.warehouses)
  }

  search($event){
    return new Promise((resolve, reject)=>{
    this.warehouseService.search($event.target.value)
    .then((data)=>{
      data['data'] = data['data'].map((object)=>{
        return {
          id: object[0],
          name: object[1]
        }
      })
      resolve(this.warehouses = data['data'])
    })
    .catch(()=>{
      reject([])
    })
    })
  }

  async openModal(content: any, warehouseId: any){
    this.warehouse = await this.getWarehouseDetails(warehouseId)
    console.log(this.warehouse)
    this.utilityService.openModal(content,
      {
        size: 'xl',
      })
  }

  getWarehouseNames(){
    return new Promise((resolve, reject)=>{
      this.warehouseService.getWarehouseList()
      .then((data)=>{
        data['data'] = data['data'].map((object)=>{
          return {
            id: object[0],
            name: object[1]
          }
        })
        resolve(data['data']);
      })
      .catch(()=>{
        reject([])
      })
    })
  }

  getWarehouseDetails(warehouseId){
    return new Promise((resolve, reject)=>{
      this.warehouseService.getWarehouseDetails(warehouseId)
      .then((data)=>{
        resolve(data['data'])
      })
      .catch(()=>{
        reject({})
      })
    })
  }

  updateDetails(warehouseDetails, warehouseId){
    warehouseDetails.warehouseId = warehouseId
    this.utilityService.asyncNotification('Please wait while we are updating the data...', new Promise((resolve, reject)=>{
      this.warehouseService.editWarehouse(warehouseDetails)
      .then(()=>{
        resolve(this.utilityService.resolveAsyncPromise('Details updated successfully!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to update the contents, please try again!'))
      })
    }))

  }

}
