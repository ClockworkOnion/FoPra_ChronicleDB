import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from '../chronicle.service';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class GetFlankService {

  currentStream! : ChronicleStream;
  
  constructor(public data:ChronicleService, private http: HttpClient, private snackbar: SnackBarService) {
    this.data.selectedStream$.subscribe(stream => {
      if (stream)
        this.currentStream = stream;
    });
  }

  basicRightFlank() {
    return this.http.get(this.data.getUrl() + "show_right_flank/" + this.currentStream.id, {responseType:"text"})
    // return this.http.get("http://127.0.0.1:8000/show_right_flank/0", {responseType:"text"});
  } 
}
