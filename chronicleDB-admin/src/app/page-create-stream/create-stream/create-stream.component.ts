import { Component} from '@angular/core';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { CreateStreamService } from 'src/app/services/rest services/create-stream.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.css']
})
export class CreateStreamComponent {
  constructor(private chronicleService: ChronicleService, public createService: CreateStreamService) {
    chronicleService.getHttp();
  }

  getUrlString() {
    let url = this.chronicleService.getUrl();
    return (url && url.length > 0) ? url : "N/A";
  }

  onCreateStreamClicked() {
    if (this.createService.checkInput()) {
      this.createService.createStream();
    }
  }
}
