import { HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ChronicleEventElement, EventCompoundType, EventElementSingleOrList, EventElementType } from 'src/app/model/ChronicleEvent';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { BACKEND_URL } from '../auth.service';
import { ChronicleService } from '../chronicle.service';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class InsertDataService {

  constructor(private chronicleService: ChronicleService, private snackBar: SnackBarService) {  }

  async insertEvent(event:string[], timestamp: number, stream: ChronicleStream) : Promise<HttpResponse<Object>> {
    let body = this.parseInputToBody(event, timestamp, stream);

    console.log(body);
    

    return await this.chronicleService.getHttp()
      .post(BACKEND_URL + "insert_ordered/" + stream.id, body, {observe: 'response'}).toPromise()
      // .then(response => {
      //   console.log(response);
      //   this.snackBar.openSnackBarwithStyle("Event successfully inserted!","green-snackbar")
      // });
  }

  async insertEventString(event:string, id: number) {
    return await this.chronicleService.getHttp()
      .post(BACKEND_URL + "insert_ordered/" + id, event, {observe: 'response'}).toPromise()
      
      // .subscribe(response => this.snackBar.openSnackBarwithStyle("Event successfully inserted!","green-snackbar"));
  }

  parseInputToBody(eventInput:string[], timestamp: number, stream: ChronicleStream) {
    let eventDef = stream.event!;
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
    if (stream.compoundType != EventCompoundType.single) {
      payload = '{"' + stream.compoundType + '":[' + payload + ']}';
    }
    return `{"t1":${timestamp},"payload":${payload}}`;
  }
}
