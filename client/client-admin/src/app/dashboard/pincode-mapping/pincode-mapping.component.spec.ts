import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeMappingComponent } from './pincode-mapping.component';

describe('PincodeMappingComponent', () => {
  let component: PincodeMappingComponent;
  let fixture: ComponentFixture<PincodeMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
