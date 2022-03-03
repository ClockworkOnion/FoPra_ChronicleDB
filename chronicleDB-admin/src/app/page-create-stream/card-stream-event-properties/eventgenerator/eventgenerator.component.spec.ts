import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventgeneratorComponent } from './eventgenerator.component';

xdescribe('EventgeneratorComponent', () => {
  let component: EventgeneratorComponent;
  let fixture: ComponentFixture<EventgeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventgeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
