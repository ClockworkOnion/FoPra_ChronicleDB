import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';

xdescribe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });
});
