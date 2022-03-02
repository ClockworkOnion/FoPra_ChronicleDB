import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChronicleEventElement, EventCompoundType } from 'src/app/model/ChronicleEvent';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { InsertDataService } from 'src/app/services/rest services/insert-data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { IDValidators } from './id.validators';

@Component({
  selector: 'app-insert-data-manually',
  templateUrl: './insert-data-manually.component.html',
  styleUrls: ['./insert-data-manually.component.css']
})
export class InsertDataManuallyComponent implements OnInit {
  eventElements!: ChronicleEventElement[];

  // Values of the input fields
  eventElementValues!: string[];
  timestampFormControl: FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern(/\d+/),
    Validators.min(0)
  ]);

  constructor(private chronicle: ChronicleService,
    private insertService: InsertDataService, 
    private snackBar: SnackBarService,
    private idValidator: IDValidators,
    @Inject(MAT_DIALOG_DATA) public data: {stream: ChronicleStream}) {}

  ngOnInit(): void {
    // set initial Value as maxkey+1
    this.chronicle.getMaxKey(this.data.stream.id).then(text => {
      this.timestampFormControl.setValue((parseInt(text) >= 0) ? (parseInt(text) + 1) : 0);
    })
    
    // update ID validator with new stream ID
    this.timestampFormControl.setAsyncValidators(this.idValidator.largerThanPreviousId(this.data.stream.id!));

    this.eventElements = this.data.stream.event!;
    this.eventElementValues = new Array<string>(this.eventElements.length);
    for (let i = 0; i < this.eventElementValues.length; i++) { // defaultwert benutzen, damit es nicht undefined ist
      this.eventElementValues[i] = "";
    }    
  }

  elementValueChanged(index: number, newValue:string) {
    this.eventElementValues[index] = newValue;    
  }

  onInsertEventClicked() {
    if (!this.timestampFormControl.valid) {
      this.snackBar.openSnackBarwithStyle("Please enter a correct timestamp!","red-snackbar");
      return;
    }
    if (!this.checkNoErrorsOnElements()) {
      this.snackBar.openSnackBarwithStyle("Please fix the displayed errors first!","red-snackbar");
      return;
    }
    if (this.checkElementsFilled() 
      || this.data.stream.compoundType == EventCompoundType.varCompound)  {
      this.insertService.insertEvent(this.eventElementValues, this.timestampFormControl.value, this.data.stream)
        .then(response => {
          this.snackBar.openSnackBarwithStyle("Event successfully inserted!","green-snackbar");
          this.timestampFormControl.setValue(this.timestampFormControl.value + 1); // increment ID
        }).catch(reason => {
          this.snackBar.openRedSnackBar("Insertion failed!")
        })
    } else {
      this.snackBar.openSnackBarwithStyle("Please enter all needed Data!","red-snackbar");
      return;
    }
  }

  checkNoErrorsOnElements(): boolean {
    for (let index = 0; index < this.eventElementValues.length; index++) {
      if (this.eventElementValues[index] == undefined)
        return false;      
    }
    return true;
  }

  checkElementsFilled(): boolean {
    for (let index = 0; index < this.eventElementValues.length; index++) {
      if (!this.eventElementValues[index] || this.eventElementValues[index].length == 0)
        return false;      
    }
    return true;
  }

}
