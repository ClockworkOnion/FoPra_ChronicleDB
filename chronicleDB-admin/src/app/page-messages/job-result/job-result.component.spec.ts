import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResultComponent } from './job-result.component';

xdescribe('JobResultComponent', () => {
  let component: JobResultComponent;
  let fixture: ComponentFixture<JobResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
