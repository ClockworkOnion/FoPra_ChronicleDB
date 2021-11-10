import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

interface Inputs {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-stream-event-properties',
  templateUrl: './stream-event-properties.component.html',
  styleUrls: ['./stream-event-properties.component.css']
})
export class StreamEventPropertiesComponent implements OnInit {
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  inputs: Inputs[] = [
    {value: '"U8"', viewValue: '"U8"'},
    {value: 'U16', viewValue: 'U16'},
    {value: 'F32', viewValue: 'F32'},
    {value: 'F62', viewValue: 'F42'},
    {value: 'ConstString', viewValue: 'ConstString'},
    {value: 'VarString', viewValue: 'VarString'},
  ];

  selectedInputs = new Set<String>();
  sortedInputs = new Array<String>();
  

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Updates selected values (sortedInputs) from mat-select multiple input
   * @param event 
   */
  getValues(event: {
    isUserInput: any;
    source: { value: String; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        // console.log(event.source.value + " is now " + event.source.selected + "!")
        this.selectedInputs.add(event.source.value);
      } else {
        // console.log(event.source.value + " is now " + event.source.selected + "!")
        this.selectedInputs.delete(event.source.value);
      }
      let allValues: String = "Selected items: ";
      this.sortedInputs = Array.from(this.selectedInputs).sort();
      this.sortedInputs.forEach(x => allValues = allValues.concat(x.toString() + ", "));
      console.log(allValues);
    }
  }

}
