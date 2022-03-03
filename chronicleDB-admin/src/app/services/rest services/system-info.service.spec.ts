import { TestBed } from '@angular/core/testing';

import { SystemInfoService } from './system-info.service';

xdescribe('SystemInfoService', () => {
  let service: SystemInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemInfoService);
  });
});
