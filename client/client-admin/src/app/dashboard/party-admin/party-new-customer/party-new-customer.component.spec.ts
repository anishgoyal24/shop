import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyNewCustomerComponent } from './party-new-customer.component';

describe('PartyNewCustomerComponent', () => {
  let component: PartyNewCustomerComponent;
  let fixture: ComponentFixture<PartyNewCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyNewCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyNewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
