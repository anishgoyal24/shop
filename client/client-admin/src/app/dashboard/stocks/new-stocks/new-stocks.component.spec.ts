import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStocksComponent } from './new-stocks.component';

describe('NewStocksComponent', () => {
  let component: NewStocksComponent;
  let fixture: ComponentFixture<NewStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
