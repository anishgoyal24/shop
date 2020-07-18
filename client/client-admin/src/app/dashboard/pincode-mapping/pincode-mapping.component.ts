import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-pincode-mapping',
  templateUrl: './pincode-mapping.component.html',
  styleUrls: ['./pincode-mapping.component.scss']
})
export class PincodeMappingComponent implements OnInit {

  constructor(
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
  }

}
