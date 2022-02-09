import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class JavaChronicleService {

  constructor(private http: HttpClient, private snackBar: SnackBarService, private authService : AuthService) { }
}
