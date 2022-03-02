import { TestBed } from '@angular/core/testing';

import { JavaChronicleService } from './java-chronicle.service';

describe('JavaChronicleService', () => {
  let service: JavaChronicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavaChronicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
