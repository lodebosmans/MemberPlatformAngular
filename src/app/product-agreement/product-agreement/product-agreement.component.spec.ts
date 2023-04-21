import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAgreementComponent } from './product-agreement.component';

describe('ProductAgreementComponent', () => {
  let component: ProductAgreementComponent;
  let fixture: ComponentFixture<ProductAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
