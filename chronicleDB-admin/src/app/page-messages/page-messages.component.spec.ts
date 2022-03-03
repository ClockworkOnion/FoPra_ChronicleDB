import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMessagesComponent } from './page-messages.component';

xdescribe('PageMessagesComponent', () => {
  let component: PageMessagesComponent;
  let fixture: ComponentFixture<PageMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
