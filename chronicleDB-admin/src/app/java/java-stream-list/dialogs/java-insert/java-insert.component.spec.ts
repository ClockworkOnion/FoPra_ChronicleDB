import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaInsertComponent } from './java-insert.component';

describe('JavaInsertComponent', () => {
  let component: JavaInsertComponent;
  let fixture: ComponentFixture<JavaInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
