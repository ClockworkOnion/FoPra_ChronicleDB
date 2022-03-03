import { TestBed } from '@angular/core/testing';

import { CreateStreamService } from './create-stream.service';

xdescribe('CreateStreamService', () => {
  let service: CreateStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateStreamService);
  });
});
