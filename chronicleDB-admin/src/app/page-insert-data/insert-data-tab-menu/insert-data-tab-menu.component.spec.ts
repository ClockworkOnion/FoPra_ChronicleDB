import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDataTabMenuComponent } from './insert-data-tab-menu.component';

describe('InsertDataTabMenuComponent', () => {
  let component: InsertDataTabMenuComponent;
  let fixture: ComponentFixture<InsertDataTabMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertDataTabMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDataTabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
