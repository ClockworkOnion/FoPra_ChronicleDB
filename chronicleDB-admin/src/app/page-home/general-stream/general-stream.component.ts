import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-stream',
  templateUrl: './general-stream.component.html',
  styleUrls: ['./general-stream.component.css']
})
export class GeneralStreamComponent implements OnInit {
  chronicleURL = "";

  constructor() { }

  ngOnInit(): void {
  }

  refreshCurrentStream() {
    
  }

}
