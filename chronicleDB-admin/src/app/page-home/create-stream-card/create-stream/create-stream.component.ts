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

  deleteProperty(property: any) {
    let index = this.properties.findIndex(data => data === property);
    this.properties.splice(index, 1);
    this.propertyCount = (this.propertyCount == 0 ? 0 : this.propertyCount-1);
  }

}
