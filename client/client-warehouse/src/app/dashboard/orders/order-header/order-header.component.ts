import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent implements OnInit {

  constructor() { }

  type: string;

  ngOnInit() {
    this.type = sessionStorage.getItem('type');
  }

}
