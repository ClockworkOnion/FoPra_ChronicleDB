import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from '../chronicle.service';

@Injectable({
  providedIn: 'root'
})
export class GetFlankService {

  currentStream! : ChronicleStream | null ;
  constructor(public data:ChronicleService, private http: HttpClient) {
    this.data.selectedStream$.subscribe(stream => {
      this.currentStream = stream;
    })
    this.data.setupTestStreamData();
  }


  basicRightFlank() {
    return this.http.get(this.data.getUrl() + "show_right_flank/" + this.currentStream!.id, {responseType:"text"})
  } 


}
