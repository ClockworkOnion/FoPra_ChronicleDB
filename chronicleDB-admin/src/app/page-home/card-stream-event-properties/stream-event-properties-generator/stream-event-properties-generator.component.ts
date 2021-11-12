import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stream-event-properties-generator',
  templateUrl: './stream-event-properties-generator.component.html',
  styleUrls: ['./stream-event-properties-generator.component.css']
})
export class StreamEventPropertiesGeneratorComponent implements OnInit {
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
