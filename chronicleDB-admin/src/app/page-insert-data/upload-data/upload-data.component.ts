import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent{
  fileName!: string;

  constructor() { }

  onFileSelected(event: any) {
    if (!event.target) 
    return;

    const file:File = event.target.files[0];

        if (file) {
            this.fileName = file.name;
          console.log(file.text);
          console.log(file);
          
          
        }
    
  }
}
