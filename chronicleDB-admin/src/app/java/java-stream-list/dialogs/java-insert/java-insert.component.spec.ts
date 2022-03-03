import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JavaChronicleService } from 'src/app/java/services/java-chronicle.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

import { JavaInsertComponent } from './java-insert.component';

xdescribe('JavaInsertComponent', () => {
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

});
