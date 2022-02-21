import { TestBed } from '@angular/core/testing';

import { JavaAuthGuard } from './java-auth-guard.service';

describe('JavaAuthGuard', () => {
  let service: JavaAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavaAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
