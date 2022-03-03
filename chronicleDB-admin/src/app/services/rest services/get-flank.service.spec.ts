import { TestBed } from '@angular/core/testing';

import { GetFlankService } from './get-flank.service';

xdescribe('GetFlankService', () => {
  let service: GetFlankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFlankService);
  });
});
