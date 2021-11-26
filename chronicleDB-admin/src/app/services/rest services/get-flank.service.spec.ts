import { TestBed } from '@angular/core/testing';

import { GetFlankService } from './get-flank.service';

describe('GetFlankService', () => {
  let service: GetFlankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFlankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
