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

  searchTerm$ = new Subject<string>();

  // Name
  selectedWarehouseName: string;

  // Warehouse List
  warehouseList = [];

  // Selected Warehouse
  selectedWarehouse: any;

  // Warehouse list toggle  
  warehouseListHidden = false;

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
    this.searchService.search(this.searchTerm$).subscribe((res) => {
      res = res.map((warehouse: any) => {
        return {
          id: warehouse[0],
          warehouseName: warehouse[1],
          warehouseEmail: warehouse[2]
        }
      })
      this.warehouseList = res;
      this.listLength = this.warehouseList.length;
      console.log(this.warehouseList);
    })
  }

  getStocks(warehouseId: any) {
    this.utilityService.asyncNotification('Retreiving Stock Details!',
      new Promise((resolve, reject) => {
        this.stockService.getStock(warehouseId)
          .then((res) => {
            this.createArray(res['data']);
            console.log(this.stocks);
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

  toggleList() {
    this.warehouseListHidden = !this.warehouseListHidden;
    console.log(this.selectedWarehouse)

    this.stockService.updateData(this.selectedWarehouse)
  }

  onSearch($event) {
    this.warehouseListHidden = false
    this.searchTerm$.next($event.target.value)
  }

}
