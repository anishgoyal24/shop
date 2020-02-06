import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.scss']
})
export class ManageSectionComponent implements OnInit {

  constructor() { }

  @Input('state') state: string = '';

  ngOnInit() {
  }

}
