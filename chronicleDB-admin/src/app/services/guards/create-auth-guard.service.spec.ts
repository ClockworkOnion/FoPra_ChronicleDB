import { TestBed } from '@angular/core/testing';

import { CreateAuthGuard } from './create-auth-guard.service';

describe('CreateAuthGuardService', () => {
  let service: CreateAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
