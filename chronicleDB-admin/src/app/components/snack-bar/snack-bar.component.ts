import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }
  
  openSnackBar(message: string) {
    this._snackBar.open("(Maybe) connected to  " +message, "Got it!");
  }
  ngOnInit(): void {
  }

}
