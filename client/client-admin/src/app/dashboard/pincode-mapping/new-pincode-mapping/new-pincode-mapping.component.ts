import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/shared/services/warehouse.service';
import { PincodeMappingService } from 'src/shared/services/pincode-mapping.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-new-pincode-mapping',
  templateUrl: './new-pincode-mapping.component.html',
  styleUrls: ['./new-pincode-mapping.component.scss']
})
export class NewPincodeMappingComponent implements OnInit {

  constructor(
    private warehouseService: WarehouseService,
    private pincodeMappingService: PincodeMappingService,
    private utilityService: UtilityService
  ) { }

  warehouseQuery: string;

  warehouseList = [];

  selectedWarehouseName: string;

  pincodeWarehouseMapping = {
    pincode: null,
    warehouseDetails: {
      warehouseId: 0
    }
  }

  ngOnInit() {
  }

  createMapping(){
    try {
      this.utilityService.asyncNotification("Creating the mapping...", new Promise((resolve, reject)=>{
        this.pincodeMappingService.addMapping(this.pincodeWarehouseMapping).then((res)=>{
          if (res['message'] == 'success'){
            resolve(this.utilityService.resolveAsyncPromise("Successfully Added Mapping!"));
          }
          else{
            reject(this.utilityService.infoNotfication("Mapping Already Exists!"));
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise("There was some error! Please try again later."));
        })
      }))
    } catch (error) {
      console.log(error);
    }
  }

  searchWarehouse(query: string){
    try {
      this.warehouseService.search(query).then((res)=>{
        this.warehouseList = res['data'];
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

}
