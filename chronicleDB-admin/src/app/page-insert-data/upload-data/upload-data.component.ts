import { Component, OnInit } from '@angular/core';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { InsertDataService } from 'src/app/services/rest services/insert-data.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent implements OnInit {
  fileName!: string;
  fileContent!: string;
  steamAvailable!: boolean;

  constructor(private insertService: InsertDataService, private chronicle: ChronicleService) {}

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
      this.insertService.insertEventString(JSON.stringify(event));
    })
  }
}
