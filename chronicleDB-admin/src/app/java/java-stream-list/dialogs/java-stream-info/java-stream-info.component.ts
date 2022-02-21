import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JavaChronicleService } from 'src/app/java/services/java-chronicle.service';
import { ChronicleJavaStreamInfo } from 'src/app/model/JavaChronicle';
import { JobService } from 'src/app/services/job.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-java-stream-info',
  templateUrl: './java-stream-info.component.html',
  styleUrls: ['./java-stream-info.component.css']
})
export class JavaStreamInfoComponent implements OnInit {
  schema: string = "";
  info!: ChronicleJavaStreamInfo;


  constructor(
    public dialogRef: MatDialogRef<JavaStreamInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string},
    private snackBar: SnackBarService, private javaChronicle: JavaChronicleService,
    private jobService: JobService, private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.info = this.javaChronicle.getStream(this.data.name)!;
    this.schema = JSON.stringify(this.info.schema);
  }


  copyInputMessage() {
    this.clipboard.copy(JSON.stringify(this.info))
    this.snackBar.openSnackBarwithStyle("Copied Stream Info!","green-snackbar");
  }
}
