import { TestBed } from '@angular/core/testing';

import { InsertDataService } from './insert-data.service';

xdescribe('InsertDataService', () => {
  let service: InsertDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertDataService);
  });
});
