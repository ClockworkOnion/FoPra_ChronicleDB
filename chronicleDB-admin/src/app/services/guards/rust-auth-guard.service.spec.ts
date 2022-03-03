import { TestBed } from '@angular/core/testing';

import { RustAuthGuard } from './rust-auth-guard.service';

xdescribe('RustAuthGuard', () => {
  let service: RustAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RustAuthGuard);
  });
});
