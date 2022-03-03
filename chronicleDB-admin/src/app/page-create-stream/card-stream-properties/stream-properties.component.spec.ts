import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamPropertiesComponent } from './stream-properties.component';

xdescribe('StreamPropertiesComponent', () => {
  let component: StreamPropertiesComponent;
  let fixture: ComponentFixture<StreamPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
