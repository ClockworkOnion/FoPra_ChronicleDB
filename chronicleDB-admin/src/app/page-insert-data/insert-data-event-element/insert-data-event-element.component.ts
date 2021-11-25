import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ChronicleEventElement, EventCompoundType, EventElementSingleOrList, EventElementSubtype, EventElementType } from 'src/app/model/ChronicleEvent';
import { EventElementValidator } from './event-element-validator';

@Component({
  selector: 'app-insert-data-event-element',
  templateUrl: './insert-data-event-element.component.html',
  styleUrls: ['./insert-data-event-element.component.css']
})
export class InsertDataEventElementComponent {
  @Input("element") eventElement!: ChronicleEventElement;
  @Input("varCompound") compoundType!: EventCompoundType;
  @Output("valueChange") valueChanged = new EventEmitter<string>();

  inputControl: FormControl = new FormControl("");

  constructor() { }

  onValueChanged() {
    if (this.validateInput()) {
      this.valueChanged.emit(this.inputControl.value);
    } else {
      this.valueChanged.emit(undefined);
    }
  }

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

  validateInput(): boolean {
    // if varComponent then it is ok to leave Elements blank
    if (this.compoundType === EventCompoundType.varCompound && (this.inputControl.value as string).length == 0) {
      return true;
    }

    let error: ValidationErrors | null = null;
    if (this.eventElement.singleOrList == EventElementSingleOrList.single) {
      switch (this.eventElement.type) {
        case EventElementType.float: {
          error = EventElementValidator.validateFloat(this.inputControl.value, this.eventElement.subtype);
          break;
        }
        case EventElementType.unsigned: {
          error = EventElementValidator.validateUnsigned(this.inputControl.value, this.eventElement.subtype);
          break;
        }
        case EventElementType.integer: {
          error = EventElementValidator.validateInteger(this.inputControl.value, this.eventElement.subtype);
          break;
        }
        case EventElementType.string: {
          error = EventElementValidator.validateString(this.inputControl.value, this.eventElement.subtype, this.eventElement.size);
          break;
        }
        default:
          error = {error: "Case could not be handled. No implementation yet!"};
      }
    } else {
      error = EventElementValidator.validateList(this.inputControl.value, this.eventElement.singleOrList, this.eventElement.size);
    }

    this.inputControl.setErrors(error);
    return !error;
  }
}
