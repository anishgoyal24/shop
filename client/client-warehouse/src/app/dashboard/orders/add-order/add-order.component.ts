import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/shared/services/stock.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { OrderService } from 'src/shared/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  constructor(
    private stockService: StockService,
    private utilityService: UtilityService,
    private orderService: OrderService
  ) { }

  stocks = [];

  orderDetails = [];

  warehouseId: string;

  ngOnInit() {
    this.warehouseId = sessionStorage.getItem("warehouseId");
    this.getProductsList();
  }

  getProductsList(){
    this.utilityService.asyncNotification('Retrieving Stock Details...', new Promise((resolve, reject)=>{
      this.stockService.getStock(this.warehouseId).then((res)=>{
        console.log(res);
        this.createArray(res['data']);
        resolve(this.utilityService.resolveAsyncPromise('Successfully Fetched Stock!'));
      }).catch((err)=>{
        console.log(err);
        reject(this.utilityService.rejectAsyncPromise('There was some error fetching stock. Please try again later!'));
      })
    }))
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

  addOrderItem(){
    this.orderDetails.push(new OrderDetail());
  }

  addOrder(){
    var orderHeader = new OrderHeader();
    orderHeader.warehouseDetails.warehouseId = sessionStorage.getItem("warehouseId");
    orderHeader.orderDetails = this.orderDetails;
    orderHeader.paymentMode = 'COD';
    orderHeader.status = 'Closed';
    this.utilityService.asyncNotification('Please wait while we add your order...', new Promise((resolve, reject)=>{
      this.orderService.addOrder(orderHeader).then((res)=>{
        console.log(res);
        resolve(this.utilityService.resolveAsyncPromise("Successfully Added Order!"));
      }).catch((err)=>{
        reject(this.utilityService.rejectAsyncPromise("Some error occured while adding the order again. Please try again later!"));
      })
    }))
  }

  delete(idx: number){
    this.orderDetails.splice(idx, 1);
  }

}

class OrderDetail{
  itemDetails: any;
  quantity: number;
  actualCost: number;
  discountedCost: number;

  constructor(){
    this.itemDetails = new Object();
  }
}

class OrderHeader{
  warehouseDetails: any;
  paymentMode: string;
  status: string;
  orderDetails: any;

  constructor(){
    this.warehouseDetails = new Object();
    this.orderDetails = new Object();
  }
}
