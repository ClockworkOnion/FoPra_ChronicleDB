import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaCreateStreamComponent } from './java-create-stream.component';

describe('JavaCreateStreamComponent', () => {
  let component: JavaCreateStreamComponent;
  let fixture: ComponentFixture<JavaCreateStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaCreateStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaCreateStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
