import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { InsertDataService } from 'src/app/services/rest services/insert-data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent implements OnInit {
  fileName!: string;
  fileContent!: string;
  steamAvailable!: boolean;

  constructor(private insertService: InsertDataService, private chronicle: ChronicleService,
    @Inject(MAT_DIALOG_DATA) public data: {stream: ChronicleStream},
    private snackBar: SnackBarService) {}

  ngOnInit() {
    this.chronicle.selectedStream$.subscribe(stream => {
      this.steamAvailable = stream != null;
    })
  }

  onFileSelected(event: any) {
    if (!event.target) return;

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (x) {
        self.fileContent = fileReader.result as string;
      };
      fileReader.readAsText(file);
    }
  }

  onInsertEventClicked() {
    let lines : string = this.fileContent.split("\n").map(line => line.trim()).join("");
    let events : Array<any> = JSON.parse(lines);
    events.forEach(event => {
      this.insertService.insertEventString(JSON.stringify(event), this.data.stream.id).then(value => {
        if (value.status != 200) {
          this.snackBar.openSnackBarwithStyle("Insertion failed!","red-snackbar");
          return;
        }
      });
    })
    this.snackBar.openSnackBarwithStyle("Event successfully inserted!","green-snackbar")
  }
}
