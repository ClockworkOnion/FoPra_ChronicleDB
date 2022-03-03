import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaStreamListComponent } from './java-stream-list.component';

xdescribe('JavaStreamListComponent', () => {
  let component: JavaStreamListComponent;
  let fixture: ComponentFixture<JavaStreamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaStreamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaStreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
