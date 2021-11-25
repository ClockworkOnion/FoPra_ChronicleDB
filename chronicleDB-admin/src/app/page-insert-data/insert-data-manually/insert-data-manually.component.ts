import { Component, OnInit } from '@angular/core';
import { ChronicleEventElement, EventCompoundType } from 'src/app/model/ChronicleEvent';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { InsertDataService } from 'src/app/services/rest services/insert-data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-insert-data-manually',
  templateUrl: './insert-data-manually.component.html',
  styleUrls: ['./insert-data-manually.component.css']
})
export class InsertDataManuallyComponent implements OnInit {
  selectedStream!: ChronicleStream;
  eventElements!: ChronicleEventElement[];

  // Values of the input fields
  eventElementValues!: string[];
  timestamp!: string;

  constructor(private chronicle: ChronicleService,
    private insertService: InsertDataService, 
    private snackBar: SnackBarService) {}

  ngOnInit(): void {
    // subscribe to selected Stream
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

  onInsertEventClicked() {    
    if (!this.checkAllElementsFilled()) {
      this.snackBar.openSnackBar("Please enter all needed Data!");
    } else {
      console.log(this.eventElementValues);
      this.insertService.insertEvent(this.eventElementValues);
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
