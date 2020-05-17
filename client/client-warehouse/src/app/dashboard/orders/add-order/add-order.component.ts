import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  constructor() { }

  warehouseId: string;

  ngOnInit() {
    this.warehouseId = sessionStorage.getItem("warehouseId");
    this.getProductsList();
  }

  getProductsList(){
    
  }

}
