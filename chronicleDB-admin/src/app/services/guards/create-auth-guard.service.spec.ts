import { TestBed } from '@angular/core/testing';

import { CreateAuthGuard } from './create-auth-guard.service';

xdescribe('CreateAuthGuardService', () => {
  let service: CreateAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAuthGuard);
  });
});
