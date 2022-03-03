import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SnackBarService } from 'src/app/services/snack-bar.service';

import { JavaChronicleService } from './java-chronicle.service';

xdescribe('JavaChronicleService', () => {
  let service: JavaChronicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpClient, SnackBarService]});
    service = TestBed.inject(JavaChronicleService);
  });
});
