import { Component, OnInit } from '@angular/core';
import { ChronicleEventElement, EventCompoundType } from 'src/app/model/ChronicleEvent';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-insert-data-manually',
  templateUrl: './insert-data-manually.component.html',
  styleUrls: ['./insert-data-manually.component.css']
})
export class InsertDataManuallyComponent implements OnInit {
  selectedStream!: ChronicleStream;
  eventElements!: ChronicleEventElement[];
  eventElementValues!: string[];

  constructor(private chronicle: ChronicleService, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.chronicle.selectedStream$.subscribe(stream => {
      if (stream) {
        this.selectedStream = stream;
        this.eventElements = stream.event;
        this.eventElementValues = new Array<string>(this.eventElements.length);
      }
    });
    this.chronicle.setupTestStreamData();
  }

  elementValueChanged(index: number, newValue:string) {
    this.eventElementValues[index] = newValue;    
  }

  onAddEventClicked() {
    console.log(this.selectedStream);
    this.selectedStream.compundType == EventCompoundType.varCompound
    
    if (!this.checkAllElementsFilled()) {
      this.snackBar.openSnackBar("Please enter all needed Data!");
      return;
    } else {
      console.log(this.eventElementValues);
      // TODO hinzufügen in ChronicleDB
    }
  }

  checkAllElementsFilled(): boolean {
    for (let index = 0; index < this.eventElementValues.length; index++) {
      if (!this.eventElementValues[index])
        return false;      
    }
    return true;
  }
}
