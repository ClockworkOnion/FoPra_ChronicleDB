import { Component } from '@angular/core';
import { InsertDataService } from 'src/app/services/rest services/insert-data.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css'],
})
export class UploadDataComponent {
  fileName!: string;
  fileContent!: string;

  constructor(private insertService: InsertDataService) {}

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
    let lines:string[] = this.fileContent.split("\n").map(line => line.trim());
    lines.forEach(line => {
      this.insertService.insertEventString(line);
    })
  }
}
