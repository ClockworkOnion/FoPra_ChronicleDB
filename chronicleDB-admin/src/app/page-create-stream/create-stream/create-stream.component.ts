import { Component } from '@angular/core';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { CreateStreamService } from 'src/app/services/rest services/create-stream.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.css']
})
export class CreateStreamComponent {

  constructor(private chronicleService: ChronicleService, private createService: CreateStreamService, private snackBar: SnackBarService, private router: Router) {
    chronicleService.getHttp();
  }

  getUrlString() {
    let url = this.chronicleService.getUrl();
    return (url && url.length > 0) ? url : "N/A";
  }

  onCreateStreamClicked() {
    if (this.createService.checkInput()) {
      let response = this.createService.createStream();
      response.subscribe(response => {
        this.snackBar.openSnackBar("Successfully created a new Stream!");
        this.router.navigateByUrl("/home");
      })
    }
  }
}
