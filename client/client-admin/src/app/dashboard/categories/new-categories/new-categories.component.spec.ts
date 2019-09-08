import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoriesComponent } from './new-categories.component';

describe('NewCategoriesComponent', () => {
  let component: NewCategoriesComponent;
  let fixture: ComponentFixture<NewCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
