import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJobsComponent } from './page-jobs.component';

xdescribe('PageJobsComponent', () => {
  let component: PageJobsComponent;
  let fixture: ComponentFixture<PageJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
