import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-stream-info',
  templateUrl: './stream-info.component.html',
  styleUrls: ['./stream-info.component.css']
})
export class StreamInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<StreamInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {streamId: number, streamInfo: string},
    private snackBar: SnackBarService
  ) {}


  copyInputMessage(inputElement:any) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    this.snackBar.openSnackBar("Copied Stream Info!");
  }

}
