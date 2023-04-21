import { TestBed } from '@angular/core/testing';

import { PriceAgreementService } from './price-agreement.service';

describe('PriceAgreementService', () => {
  let service: PriceAgreementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceAgreementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
