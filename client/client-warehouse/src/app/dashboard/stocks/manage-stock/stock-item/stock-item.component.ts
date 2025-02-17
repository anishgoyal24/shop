import { Component, OnInit, Input } from '@angular/core';
import { StockService } from 'src/shared/services/stock.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {

  @Input() stockItem: any;
  @Input() selectedWarehouse: number;
  @Input() transfer: boolean = true;
  constructor(
    private stockService: StockService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.stockService.data
    .subscribe((res)=>{
      if(res){
        this.selectedWarehouse = res
      }
    })
  }
  // Stock to be trannsferred  
  transferredStock = {
    id: 0,
    warehouseDetails: {
      warehouseId: 0 
    },
    itemPackingDetails: {
      id: 0
    },
    quantity: 0,
    price: 0
 }

  quantity:number = 0;

 increment(){
    if (this.quantity != this.stockItem.quantity){
      this.quantity++;
    }
 }

 decrement(){
    if (this.quantity != 0){
      this.quantity--;
    }
 }

 transferStock(){
   if (this.quantity == 0){
     this.utilityService.warningNotification('Please set quantity to transfer...');
     return;
   }
    this.transferredStock = {
      id: this.stockItem.id,
      warehouseDetails: {
        warehouseId: this.selectedWarehouse
      },
      itemPackingDetails: {
        id: this.stockItem.itemPackingDetails.id
      },
      quantity: this.quantity,
      price: this.stockItem.price
    };
    // Service function to treansfer stock
    this.utilityService.asyncNotification('Transferring stock...', new Promise((resolve, reject)=>{
      this.stockService.transferStock(this.transferredStock)
      .then((res)=>{
        if (res['message']=='success'){
          this.stockItem.quantity -= this.transferredStock.quantity;
          this.transferredStock.quantity = 0;
          resolve(this.utilityService.resolveAsyncPromise('Successfully Transferred Stock!'));
        }
      }).catch((err)=>{
        reject(this.utilityService.rejectAsyncPromise('There was some error transferring the stock. Please try again later!'));
      })
    }))
  }


  disabled(){
    if (!(this.quantity>0) && !(this.quantity <= this.stockItem['quantity']))return true;
    else return false;
  }

}
