import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamListComponent } from './stream-list.component';

xdescribe('StreamListComponent', () => {
  let component: StreamListComponent;
  let fixture: ComponentFixture<StreamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
