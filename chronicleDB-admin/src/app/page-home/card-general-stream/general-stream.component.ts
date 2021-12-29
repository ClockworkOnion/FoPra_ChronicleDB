import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { CreateStreamService } from 'src/app/services/rest services/create-stream.service';

@Component({
  selector: 'app-general-stream',
  templateUrl: './general-stream.component.html',
  styleUrls: ['./general-stream.component.css'],
})
export class GeneralStreamComponent implements OnInit {
  createStreamProperties: any;
  eventProperties: any;
  chronicleUrl : FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("(https?:\/\/.+(\.|:).+\/)")
  ]);

  

  constructor(
    public chronicleService: ChronicleService,
    private createService: CreateStreamService
  ) { }

  updateURL(url: string) {
    if (this.chronicleUrl.valid)
      this.chronicleService.setUrl(url);
  }

  ngOnInit(): void {
    this.createService.currentCreateStreamProperties.subscribe(
      (message: any) => (this.createStreamProperties = message)
    );
    this.createService.currentEventProperties.subscribe(
      (message: any) => (this.eventProperties = message)
    );

    this.chronicleUrl.setValue(this.chronicleService.getUrl());
  }
}
