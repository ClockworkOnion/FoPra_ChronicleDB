import { TestBed } from '@angular/core/testing';

import { RustAuthGuard } from './rust-auth-guard.service';

describe('RustAuthGuard', () => {
  let service: RustAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RustAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
