import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDataEventElementComponent } from './insert-data-event-element.component';

describe('InsertDataEventElementComponent', () => {
  let component: InsertDataEventElementComponent;
  let fixture: ComponentFixture<InsertDataEventElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertDataEventElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDataEventElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
