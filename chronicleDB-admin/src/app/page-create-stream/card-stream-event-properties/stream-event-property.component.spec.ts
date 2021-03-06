import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamEventPropertyComponent } from './stream-event-property.component';

xdescribe('StreamEventPropertyComponent', () => {
  let component: StreamEventPropertyComponent;
  let fixture: ComponentFixture<StreamEventPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamEventPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamEventPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
