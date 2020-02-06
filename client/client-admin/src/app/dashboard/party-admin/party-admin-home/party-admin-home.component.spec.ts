import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAdminHomeComponent } from './party-admin-home.component';

describe('PartyAdminHomeComponent', () => {
  let component: PartyAdminHomeComponent;
  let fixture: ComponentFixture<PartyAdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyAdminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
