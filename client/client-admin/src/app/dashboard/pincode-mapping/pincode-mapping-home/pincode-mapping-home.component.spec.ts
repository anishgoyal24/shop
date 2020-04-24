import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeMappingHomeComponent } from './pincode-mapping-home.component';

describe('PincodeMappingHomeComponent', () => {
  let component: PincodeMappingHomeComponent;
  let fixture: ComponentFixture<PincodeMappingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeMappingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeMappingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
