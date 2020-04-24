import { Component, OnInit } from '@angular/core';
import { PincodeMappingService } from 'src/shared/services/pincode-mapping.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-manage-pincode-mapping',
  templateUrl: './manage-pincode-mapping.component.html',
  styleUrls: ['./manage-pincode-mapping.component.scss']
})
export class ManagePincodeMappingComponent implements OnInit {

  constructor(
    private pincodeMappingService: PincodeMappingService,
    private utilityService: UtilityService
  ) { }

  mappingList = [];

  searchQuery: string;

  ngOnInit() {
    this.getFirst10();
  }

  getFirst10(){
    try {
      this.utilityService.asyncNotification("Fetching Mappings...", new Promise((resolve, reject)=>{
        this.pincodeMappingService.getFirst10Mappings().then((res)=>{
          this.mappingList = res['data'];
          resolve(this.utilityService.resolveAsyncPromise("Successfully fetched mappings!"));
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise("There was some error retrieving mappings! Please try again later."));
        })
      }))
    } catch (error) {
      console.log(error);
    }
  }

  search(searchQuery: string){
    try {
      new Promise((resolve, reject)=>{
        this.pincodeMappingService.search(searchQuery).then((res)=>{
          this.mappingList = res['data'];
          resolve();
        }).catch((err)=>{
          console.log(err);
          reject();
        })
      })
    } catch (error) {
      console.log(error);
    }
  }


  toggle(mapping: any){
    var toggle = mapping.enabled==1?"Disabling":"Enabling";
    try {
      this.utilityService.asyncNotification( `${toggle} Mapping...`, new Promise((resolve, reject)=>{
        this.pincodeMappingService.toggleEnabled(mapping.id).then((res)=>{
          var toggle = mapping.enabled==1?"Disabled":"Enabled";
          mapping.enabled = mapping.enabled==1?0:1;
          resolve(this.utilityService.resolveAsyncPromise(`Successfully ${toggle} mapping!`));
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise(`There was some error ${toggle} mappings! Please try again later.`));
        })
      }))
    } catch (error) {
      console.log(error);
    }
  }

  getNext10(id: any){
    try {
      new Promise((resolve, reject)=>{
        this.pincodeMappingService.getNext10Mappings(id).then((res)=>{
          this.mappingList = res['data'];
          resolve();
        }).catch((err)=>{
          console.log(err);
          reject();
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

}
