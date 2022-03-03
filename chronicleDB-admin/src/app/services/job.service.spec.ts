import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';

xdescribe('JobService', () => {
  let service: JobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobService);
  });
});
