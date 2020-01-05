import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHeaderComponent } from './party-header.component';

describe('PartyHeaderComponent', () => {
  let component: PartyHeaderComponent;
  let fixture: ComponentFixture<PartyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
