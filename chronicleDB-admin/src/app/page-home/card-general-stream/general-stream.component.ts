import { Component, OnInit } from '@angular/core';
import { ChronicleService } from 'src/app/services/chronicle.service';

@Component({
  selector: 'app-general-stream',
  templateUrl: './general-stream.component.html',
  styleUrls: ['./general-stream.component.css']
})
export class GeneralStreamComponent implements OnInit {
  message:any;
  chronicleURL = "";
  currentStreamText = "No Stream available";

  constructor(private chronicleService: ChronicleService) { }


  ngOnInit(): void {
    this.chronicleService.currentMessage.subscribe((message: any) => this.message = message)
  }

  refreshCurrentStream() {
    this.currentStreamText = this.chronicleService.existsStream() ? this.chronicleService.getStreamInfo() : "No Stream available"
  }


}