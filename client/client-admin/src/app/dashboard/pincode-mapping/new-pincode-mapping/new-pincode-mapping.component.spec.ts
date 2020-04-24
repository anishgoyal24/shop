import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPincodeMappingComponent } from './new-pincode-mapping.component';

describe('NewPincodeMappingComponent', () => {
  let component: NewPincodeMappingComponent;
  let fixture: ComponentFixture<NewPincodeMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPincodeMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPincodeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
