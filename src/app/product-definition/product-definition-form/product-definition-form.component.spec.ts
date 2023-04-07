import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDefinitionFormComponent } from './product-definition-form.component';

describe('ProductDefinitionFormComponent', () => {
  let component: ProductDefinitionFormComponent;
  let fixture: ComponentFixture<ProductDefinitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDefinitionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDefinitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
