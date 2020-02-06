import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAdminHeaderComponent } from './party-admin-header.component';

describe('PartyAdminHeaderComponent', () => {
  let component: PartyAdminHeaderComponent;
  let fixture: ComponentFixture<PartyAdminHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyAdminHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyAdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
