import { TestBed } from '@angular/core/testing';

import { ChronicleService } from './chronicle.service';

xdescribe('ChronicleService', () => {
  let service: ChronicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChronicleService);
  });
});
