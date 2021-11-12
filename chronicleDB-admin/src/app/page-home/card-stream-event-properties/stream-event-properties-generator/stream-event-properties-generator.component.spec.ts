import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamEventPropertiesGeneratorComponent } from './stream-event-properties-generator.component';

describe('StreamEventPropertiesGeneratorComponent', () => {
  let component: StreamEventPropertiesGeneratorComponent;
  let fixture: ComponentFixture<StreamEventPropertiesGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamEventPropertiesGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamEventPropertiesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
