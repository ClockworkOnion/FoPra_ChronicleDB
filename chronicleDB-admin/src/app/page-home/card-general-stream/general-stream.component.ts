import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { CreateStreamService } from 'src/app/services/rest services/create-stream.service';

@Component({
  selector: 'app-general-stream',
  templateUrl: './general-stream.component.html',
  styleUrls: ['./general-stream.component.css']
})
export class GeneralStreamComponent implements OnInit {
  createStreamProperties:any;
  eventProperties:any;
  urlPlaceholder:any ;

  private defaultStreamDescription = "No Stream available";
  currentStreamText = this.defaultStreamDescription;

  constructor(private chronicleService: ChronicleService, private createService: CreateStreamService) {}

  updateURL(url: string) {
    this.chronicleService.setUrl(url);
  }

  ngOnInit(): void {
    this.createService.currentCreateStreamProperties.subscribe((message: any) => this.createStreamProperties = message)
    this.createService.currentEventProperties.subscribe((message:any)=> this.eventProperties = message)
    
    this.urlPlaceholder=sessionStorage.getItem("chronicleURL")
    this.updateURL(this.urlPlaceholder)
  }

  onCreateStreamClicked() {
    if (this.createService.checkInput()) {
      this.createService.createStream();
    }
  }
}