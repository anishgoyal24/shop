import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyManageCustomerComponent } from './party-manage-customer.component';

describe('PartyManageCustomerComponent', () => {
  let component: PartyManageCustomerComponent;
  let fixture: ComponentFixture<PartyManageCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyManageCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyManageCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
