import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService,
    private router: Router ) { }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
    // this.router.navigate(['/dashboard','accounts', 'home']);
  }

}
