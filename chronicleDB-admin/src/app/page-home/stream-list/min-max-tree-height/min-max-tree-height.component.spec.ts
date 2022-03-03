import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxTreeHeightComponent } from './min-max-tree-height.component';

xdescribe('MinMaxTreeHeightComponent', () => {
  let component: MinMaxTreeHeightComponent;
  let fixture: ComponentFixture<MinMaxTreeHeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinMaxTreeHeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMaxTreeHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
