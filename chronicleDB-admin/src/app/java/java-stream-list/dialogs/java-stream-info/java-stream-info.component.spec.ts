import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaStreamInfoComponent } from './java-stream-info.component';

describe('JavaStreamInfoComponent', () => {
  let component: JavaStreamInfoComponent;
  let fixture: ComponentFixture<JavaStreamInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaStreamInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaStreamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
