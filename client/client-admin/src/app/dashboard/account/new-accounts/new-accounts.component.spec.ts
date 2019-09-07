import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountsComponent } from './new-accounts.component';

describe('NewAccountsComponent', () => {
  let component: NewAccountsComponent;
  let fixture: ComponentFixture<NewAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
