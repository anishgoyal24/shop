import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemCashComponent } from './order-item-cash.component';

describe('OrderItemCashComponent', () => {
  let component: OrderItemCashComponent;
  let fixture: ComponentFixture<OrderItemCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
