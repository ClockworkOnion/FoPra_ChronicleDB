import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTravelComponent } from './time-travel.component';

describe('TimeTravelComponent', () => {
  let component: TimeTravelComponent;
  let fixture: ComponentFixture<TimeTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
