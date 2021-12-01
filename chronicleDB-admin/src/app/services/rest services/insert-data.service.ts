import { Injectable, OnInit } from '@angular/core';
import { ChronicleEventElement, EventCompoundType, EventElementSingleOrList, EventElementType } from 'src/app/model/ChronicleEvent';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from '../chronicle.service';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class InsertDataService {
  private currentStream!: ChronicleStream|null;

  constructor(private chronicleService: ChronicleService, private snackBar: SnackBarService) {
    this.chronicleService.selectedStream$.subscribe(stream => {
      this.currentStream = stream;      
    });
  }

  insertEvent(event:string[], timestamp: number) {
    let url = this.chronicleService.getUrl();
    if (!url || !this.currentStream) {
      return; 
    }
    let body = this.parseInputToBody(event, timestamp);

    this.chronicleService.getHttp()
      .post(url + "insert_ordered/" + this.currentStream!.id, body)
      .subscribe(response => this.snackBar.openSnackBar("Event successfully inserted!"));
  }

  insertEventString(event:string) {
    let url = this.chronicleService.getUrl();
    if (!url || !this.currentStream) {
      return; 
    }

    this.chronicleService.getHttp()
      .post(url + "insert_ordered/" + this.currentStream!.id, event)
      .subscribe(response => this.snackBar.openSnackBar("Event successfully inserted!"));
  }

  parseInputToBody(eventInput:string[], timestamp: number) {
    let eventDef = this.currentStream!.event;
    let payload: string = '';

    for (let i = 0; i < eventInput.length; i++) {
      const element = eventInput[i];
      const elementDef:ChronicleEventElement = eventDef[i];
      let elemString: string;

      if (element.length > 0) {
        if (i > 0 && payload.length > 0) {
          payload += ",";
        }

        if (elementDef.type == EventElementType.string) {
          elemString = '{"' + elementDef.subtype + '":' + element + "}";
        } else {
          if (elementDef.singleOrList == EventElementSingleOrList.varList) {
            elemString = '{"Var' + elementDef.type.charAt(0) + elementDef.subtype + 'List":[' + element + "]}"
          } else if (elementDef.singleOrList == EventElementSingleOrList.constList) {
            elemString = '{"Const' + elementDef.type.charAt(0) + elementDef.subtype + 'List":[' + element + "]}"
          } else {
            elemString = '{"' + elementDef.type.charAt(0) + elementDef.subtype + '":' + element + "}";
          }
        }
        
        payload += elemString;
      }
    }

    // wrap payload with Compound
    if (this.currentStream!.compoundType != EventCompoundType.single) {
      payload = '{"' + this.currentStream!.compoundType + '":[' + payload + ']}';
    }
    return `{"t1":${timestamp},"payload":${payload}}`;
  }
}
