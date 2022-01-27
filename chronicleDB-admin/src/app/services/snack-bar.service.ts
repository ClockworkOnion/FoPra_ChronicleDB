import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarRef }from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  snackBarConfig!: MatSnackBarConfig;
  snackBarRef!: MatSnackBarRef<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  snackBarAutoHide = '3000';

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message:string) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = 'custom-snackbar';
    this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
    
  }
  openSnackBarwithStyle(message:string,panel :string) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = panel;
    this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
    
  }
}
