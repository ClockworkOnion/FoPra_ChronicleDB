import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamInfoComponent } from './stream-info.component';

xdescribe('StreamInfoComponent', () => {
  let component: StreamInfoComponent;
  let fixture: ComponentFixture<StreamInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
