import { Component, OnInit } from '@angular/core';
import { ChronicleService } from 'src/app/services/chronicle.service';

@Component({
  selector: 'app-general-stream',
  templateUrl: './general-stream.component.html',
  styleUrls: ['./general-stream.component.css']
})
export class GeneralStreamComponent implements OnInit {
  createStreamProperties:any;
  eventProperties:any;

  private defaultStreamDescription = "No Stream available";
  currentStreamText = this.defaultStreamDescription;

  constructor(private data: ChronicleService) {}

  updateURL(url: string) {
    this.data.changeStreamUrl(url);
  }

  ngOnInit(): void {
    this.data.currentCreateStreamProperties.subscribe((message: any) => this.createStreamProperties = message)
    this.data.currentEventProperties.subscribe((message:any)=> this.eventProperties = message)
  }

  refreshCurrentStream(){
    if (this.data.existsStream()) {
      this.currentStreamText = this.data.getStreamInfo();
    } else {
      this.currentStreamText = this.defaultStreamDescription;
    }
  }

  onCreateStreamClicked() {

  }
}