import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';

xdescribe('AuthGuardService', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard);
  });
});
