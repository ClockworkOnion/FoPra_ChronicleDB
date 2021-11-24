import { Component, OnInit } from '@angular/core';
import { ChronicleEventElement } from 'src/app/model/ChronicleEvent';
import { ChronicleService } from 'src/app/services/chronicle.service';

@Component({
  selector: 'app-insert-data-manually',
  templateUrl: './insert-data-manually.component.html',
  styleUrls: ['./insert-data-manually.component.css']
})
export class InsertDataManuallyComponent implements OnInit {
  eventElements!: ChronicleEventElement[];

  constructor(private chronicle: ChronicleService) {}

  ngOnInit(): void {
    this.chronicle.selectedStream$.subscribe(stream => {if (stream) this.eventElements = stream.event});
    this.chronicle.setupTestStreamData();
  }

  elementValueChanged(index: number, event:any) {
    console.log("index: " + index);
    console.log("value: " + event);
    
  }
}
