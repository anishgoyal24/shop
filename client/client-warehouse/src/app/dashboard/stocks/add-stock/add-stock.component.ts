import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/shared/services/stock.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  itemsList = [];
  itemStock = {
    itemPackingDetails: {
      id: 0
    },
    warehouseDetails: {
      warehouseId: sessionStorage.getItem("warehouseId")
    },
    quantity: 0,
    price: 0
  }

  constructor(
    private stockService: StockService,
    private utilityService: UtilityService
    ) { }

  ngOnInit() {
    this.getItemsList();
  }

  getItemsList(){
    this.stockService.getItemsList()
    .then((res)=>{
        console.log(res);
        this.itemsList = res['data'];
    }).catch((err)=>{
      console.log(err);
    })
  }

  onAddStock(itemStock: any){
    try {
      this.utilityService.asyncNotification("Please wait while we are adding item to your stock..",
      new Promise((resolve, reject)=>{
        this.stockService.addStock(itemStock)
        .then((res)=>{
          resolve(this.utilityService.resolveAsyncPromise('Stock Successfully Added!'));
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise('Unable to add stock, please try againn later!'));
        })
      })
    )
    } catch (error) {
      console.log(error);
    }
  }

}
