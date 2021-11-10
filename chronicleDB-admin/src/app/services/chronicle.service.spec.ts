import { TestBed } from '@angular/core/testing';

import { ChronicleService } from './chronicle.service';

describe('ChronicleService', () => {
  let service: ChronicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChronicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
