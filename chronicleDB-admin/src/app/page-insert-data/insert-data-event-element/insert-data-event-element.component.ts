import { Component, Input, OnInit } from '@angular/core';
import { ChronicleEventElement } from 'src/app/model/ChronicleEventElement';

@Component({
  selector: 'app-insert-data-event-element',
  templateUrl: './insert-data-event-element.component.html',
  styleUrls: ['./insert-data-event-element.component.css']
})
export class InsertDataEventElementComponent implements OnInit {
  @Input("element") eventElement!: ChronicleEventElement;

  constructor() { }

  ngOnInit(): void {
  }
}
