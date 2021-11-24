import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChronicleEventElement, EventElementSingleOrList, EventElementSubtype, EventElementType } from 'src/app/model/ChronicleEvent';

@Component({
  selector: 'app-insert-data-event-element',
  templateUrl: './insert-data-event-element.component.html',
  styleUrls: ['./insert-data-event-element.component.css']
})
export class InsertDataEventElementComponent {
  @Input("element") eventElement!: ChronicleEventElement;
  @Output("valueChange") valueChanged = new EventEmitter<string>();

  constructor() { }

  get eventElementLabel() {
    switch (this.eventElement.singleOrList) {

      case EventElementSingleOrList.single: {
        switch (this.eventElement.type) {
          case EventElementType.string: {
            if (this.eventElement.subtype == EventElementSubtype.constString)
              return `String of length ${this.eventElement.size}`;
            return `String`;
          }
          default: {
            return `${this.eventElement.subtype} bit ${this.eventElement.type}`;
          }
        }
      }

      case EventElementSingleOrList.constList: {
        return `${this.eventElement.type} List of Size ${this.eventElement.size}` ;
      }

      case EventElementSingleOrList.varList: {
        return `${this.eventElement.type} List` ;
      }

      default: {return "ERROR";}
    }
  }

  onValueChanged(value:string) {
    this.valueChanged.emit(value);
  }
}
