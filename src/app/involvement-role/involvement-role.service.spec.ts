import { TestBed } from '@angular/core/testing';

import { InvolvementRoleService } from './involvement-role.service';

describe('InvolvementRoleService', () => {
  let service: InvolvementRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvolvementRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
