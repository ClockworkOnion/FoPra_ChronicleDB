import { TestBed } from '@angular/core/testing';

import { MasterGuard } from './master-guard.service';

describe('MasterGuardService', () => {
  let service: MasterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
