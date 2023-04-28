import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAgreementFormComponent } from './price-agreement-form.component';

describe('PriceAgreementFormComponent', () => {
  let component: PriceAgreementFormComponent;
  let fixture: ComponentFixture<PriceAgreementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceAgreementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceAgreementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
