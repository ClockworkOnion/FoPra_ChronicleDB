import { PropertyWrite } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.css']
})
export class CreateStreamComponent implements OnInit {

  properties = ["property1"];
  propertyCount = 1;

  constructor() { }

  ngOnInit(): void {
  }

  addProperty() {
    this.propertyCount++;
    this.properties.push("property"+this.propertyCount);
  }

}
