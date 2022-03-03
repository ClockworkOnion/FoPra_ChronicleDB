import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDataManuallyComponent } from './insert-data-manually.component';

xdescribe('InsertDataManuallyComponent', () => {
  let component: InsertDataManuallyComponent;
  let fixture: ComponentFixture<InsertDataManuallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertDataManuallyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDataManuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
