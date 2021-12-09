import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  selectedStream!: ChronicleStream | null;
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
    private idValidator: IDValidators) {}

  ngOnInit(): void {
    // subscribe to selected Stream
    this.chronicle.selectedStream$.subscribe(stream => {
      if (stream && stream.event && stream.compoundType) {        
        this.selectedStream = stream;

        // update ID validator with new stream ID
        this.timestampFormControl.setAsyncValidators(this.idValidator.largerThanPreviousId(this.selectedStream!.id));

        this.eventElements = stream.event;
        this.eventElementValues = new Array<string>(this.eventElements.length);
        for (let i = 0; i < this.eventElementValues.length; i++) { // defaultwert benutzen, damit es nicht undefined ist
          this.eventElementValues[i] = "";
        }
      } else {
        this.selectedStream = null;
        this.timestampFormControl.setAsyncValidators(null);
      }
    });
  }

  elementValueChanged(index: number, newValue:string) {
    this.eventElementValues[index] = newValue;    
  }

  onInsertEventClicked() {
    if (!this.timestampFormControl.valid) {
      this.snackBar.openSnackBar("Please enter a correct timestamp!");
      return;
    }
    if (!this.checkNoErrorsOnElements()) {
      this.snackBar.openSnackBar("Please fix the displayed errors first!");
      return;
    }
    if (this.checkElementsFilled() 
    || this.selectedStream!.compoundType == EventCompoundType.varCompound)  {
      this.insertService.insertEvent(this.eventElementValues, this.timestampFormControl.value);
      this.timestampFormControl.setValue(""); // Reset ID
    } else {
      this.snackBar.openSnackBar("Please enter all needed Data!");
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
