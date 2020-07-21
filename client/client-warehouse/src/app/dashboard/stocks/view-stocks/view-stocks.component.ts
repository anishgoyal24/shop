import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { StockService } from 'src/shared/services/stock.service';

@Component({
  selector: 'app-view-stocks',
  templateUrl: './view-stocks.component.html',
  styleUrls: ['./view-stocks.component.scss']
})
export class ViewStocksComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private stockService: StockService,
  ) { }

  stocks = []

  ngOnInit() {
    this.getStocks(sessionStorage.getItem("warehouseId"));
  }

  getStocks(warehouseId: any) {
    this.utilityService.asyncNotification('Retreiving Stock Details!',
      new Promise((resolve, reject) => {
        this.stockService.getStock(warehouseId)
          .then((res) => {
            this.createArray(res['data']);
            resolve(this.utilityService.resolveAsyncPromise('Successfully Fetched Stock Data!'));
          }).catch((err) => {
            console.log(err);
            reject(this.utilityService.rejectAsyncPromise('Some Error Occured, Please try again later'));
          })
      })
    )
  }

  createArray(data: any) {
    class Stock{
      id: number;
      itemPackingDetails: any;
      itemName: string;
      price: number;
      quantity: number;
  
      constructor(){
        this.itemPackingDetails = new Object();
      }
    };
    for (var obj of data) {
      var stock = new Stock();
      stock.id = obj[0];
      stock.itemPackingDetails.id = obj[1];
      stock.itemPackingDetails.size = obj[2];
      stock.itemName = obj[3];
      stock.price = obj[4];
      stock.quantity = obj[5];
      this.stocks.push(stock);
    }
  }

}
