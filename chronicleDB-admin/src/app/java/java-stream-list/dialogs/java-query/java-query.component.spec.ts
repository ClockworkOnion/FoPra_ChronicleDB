import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaQueryComponent } from './java-query.component';

xdescribe('JavaQueryComponent', () => {
  let component: JavaQueryComponent;
  let fixture: ComponentFixture<JavaQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
