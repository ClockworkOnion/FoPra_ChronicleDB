import { Component, OnInit } from '@angular/core';
import { ChronicleService } from 'src/app/services/chronicle.service';

@Component({
  selector: 'app-general-stream',
  templateUrl: './general-stream.component.html',
  styleUrls: ['./general-stream.component.css']
})
export class GeneralStreamComponent implements OnInit {
  chronicleURL = "";
  currentStreamText = "No Stream available";

  constructor(private service: ChronicleService) { }

  ngOnInit(): void {
  }

  refreshCurrentStream() {
    this.currentStreamText = this.service.existsStream() ? this.service.getStreamInfo() : "No Stream available"
  }
}
