import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStreamComponent } from './general-stream.component';

xdescribe('GeneralStreamComponent', () => {
  let component: GeneralStreamComponent;
  let fixture: ComponentFixture<GeneralStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
