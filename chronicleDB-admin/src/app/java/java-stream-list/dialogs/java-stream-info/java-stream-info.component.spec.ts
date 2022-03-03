import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { JavaChronicleService } from 'src/app/java/services/java-chronicle.service';
import { JobService } from 'src/app/services/job.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

import { JavaStreamInfoComponent } from './java-stream-info.component';

xdescribe('JavaStreamInfoComponent', () => {
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
});
