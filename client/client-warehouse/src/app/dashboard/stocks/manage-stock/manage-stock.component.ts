import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/shared/services/stock.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SearchService } from 'src/shared/services/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.scss']
})
export class ManageStockComponent implements OnInit {

  stocks = []
  stock = {
    id: 0,
    itemPackingDetails: {
      id: 0,
      size: 0,
    },
    itemName: "",
    price: 0,
    quantity: 0
  }

  searchTerm$ = new Subject<string>();

   // Warehouse List
   warehouseList = [];

   // LENGTH OF CATEGORY LISY
   listLength = -1;

   // BEHAVIOUR SUBJECT FOR LOADING QUERY
   isLoadingQuery$ = new BehaviorSubject(false);

  constructor(
    private utilityService: UtilityService,
    private stockService: StockService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.getStocks(sessionStorage.getItem("warehouseId"));
    this.searchService.search(this.searchTerm$).subscribe((res)=>{
      this.warehouseList = res;
      this.listLength = this.warehouseList.length;
    })
  }

  getStocks(warehouseId: any){
    this.utilityService.asyncNotification('Retreiving Stock Details!',
      new Promise((resolve, reject)=>{
        this.stockService.getStock(warehouseId)
        .then((res)=>{
          this.createArray(res['data']);
          console.log(this.stocks);
          resolve(this.utilityService.resolveAsyncPromise('Successfully Fetched Stock Data!'));
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise('Some Error Occured, Please try again later'));
        })
      })
    )
  }


  createArray(data: any){
    for (var obj of data){
      this.stock.id = obj[0];
      this.stock.itemPackingDetails.id = obj[1];
      this.stock.itemPackingDetails.size = obj[2];
      this.stock.itemName = obj[3];
      this.stock.price = obj[4];
      this.stock.quantity = obj[5];
      this.stocks.push(this.stock);
    }
  }

}
