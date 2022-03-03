import { TestBed } from '@angular/core/testing';

import { MasterGuard } from './master-guard.service';

xdescribe('MasterGuardService', () => {
  let service: MasterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterGuard);
  });
});
