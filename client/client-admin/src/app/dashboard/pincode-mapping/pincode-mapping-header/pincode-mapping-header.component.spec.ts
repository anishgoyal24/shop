import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeMappingHeaderComponent } from './pincode-mapping-header.component';

describe('PincodeMappingHeaderComponent', () => {
  let component: PincodeMappingHeaderComponent;
  let fixture: ComponentFixture<PincodeMappingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeMappingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeMappingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
