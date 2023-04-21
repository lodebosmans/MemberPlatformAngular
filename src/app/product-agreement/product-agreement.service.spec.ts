import { TestBed } from '@angular/core/testing';

import { ProductAgreementService } from './product-agreement.service';

describe('ProductAgreementService', () => {
  let service: ProductAgreementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAgreementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
