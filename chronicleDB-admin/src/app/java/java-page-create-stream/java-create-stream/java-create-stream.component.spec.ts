import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { JavaChronicleService } from '../../services/java-chronicle.service';

import { JavaCreateStreamComponent } from './java-create-stream.component';

xdescribe('JavaCreateStreamComponent', () => {
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
});
