import { TestBed } from '@angular/core/testing';

import { JavaAuthGuard } from './java-auth-guard.service';

xdescribe('JavaAuthGuard', () => {
  let service: JavaAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavaAuthGuard);
  });
});
