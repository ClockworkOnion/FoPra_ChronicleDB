import { TestBed } from '@angular/core/testing';

import { InsertDataService } from './insert-data.service';

describe('InsertDataService', () => {
  let service: InsertDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
