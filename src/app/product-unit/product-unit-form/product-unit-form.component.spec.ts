import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitFormComponent } from './product-unit-form.component';

describe('ProductUnitFormComponent', () => {
  let component: ProductUnitFormComponent;
  let fixture: ComponentFixture<ProductUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUnitFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
