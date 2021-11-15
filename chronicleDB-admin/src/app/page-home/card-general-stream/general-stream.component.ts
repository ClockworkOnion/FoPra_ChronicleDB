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

  chronicleURL!: string;
  currentStreamText = "No Stream available";

  constructor(private data: ChronicleService) { }


  ngOnInit(): void {
    this.data.currentCreateStreamProperties.subscribe((message: any) => this.createStreamProperties = message)
    this.data.currentEventProperties.subscribe((message:any)=> this.eventProperties = message)
  }

  refreshCurrentStream(){
    
  }

  onCreateStreamClicked() {

  }
}