import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePincodeMappingComponent } from './manage-pincode-mapping.component';

describe('ManagePincodeMappingComponent', () => {
  let component: ManagePincodeMappingComponent;
  let fixture: ComponentFixture<ManagePincodeMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePincodeMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePincodeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
