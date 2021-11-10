import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamEventPropertiesComponent } from './stream-event-properties.component';

describe('StreamEventPropertiesComponent', () => {
  let component: StreamEventPropertiesComponent;
  let fixture: ComponentFixture<StreamEventPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamEventPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamEventPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
