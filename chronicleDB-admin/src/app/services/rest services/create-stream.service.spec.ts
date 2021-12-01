import { TestBed } from '@angular/core/testing';

import { CreateStreamService } from './create-stream.service';

describe('CreateStreamService', () => {
  let service: CreateStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
