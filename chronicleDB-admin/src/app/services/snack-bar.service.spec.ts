import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';

xdescribe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarService);
  });
});
