import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksHeaderComponent } from './stocks-header.component';

describe('StocksHeaderComponent', () => {
  let component: StocksHeaderComponent;
  let fixture: ComponentFixture<StocksHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
