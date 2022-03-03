import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRightFlankComponent } from './show-right-flank.component';

xdescribe('ShowRightFlankComponent', () => {
  let component: ShowRightFlankComponent;
  let fixture: ComponentFixture<ShowRightFlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRightFlankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRightFlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
