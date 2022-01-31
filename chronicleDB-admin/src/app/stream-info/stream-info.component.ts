import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChronicleService } from '../services/chronicle.service';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-stream-info',
  templateUrl: './stream-info.component.html',
  styleUrls: ['./stream-info.component.css']
})
export class StreamInfoComponent implements OnInit{
  streamInfo: string = "";

  constructor(
    public dialogRef: MatDialogRef<StreamInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {streamId: number},
    private snackBar: SnackBarService, private chronicle: ChronicleService
  ) {}

  ngOnInit(): void {
    this.chronicle.getStreamInfo(this.data.streamId).then(info => {
      this.streamInfo = info
    })
  }


  copyInputMessage(inputElement:any) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    this.snackBar.openSnackBarwithStyle("Copied Stream Info!","green-snackbar");
  }

}
