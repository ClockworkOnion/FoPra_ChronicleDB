import { TestBed } from '@angular/core/testing';

import { StreamInfoService } from './stream-info.service';

describe('StreamInfoService', () => {
  let service: StreamInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
