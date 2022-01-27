import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventCompoundType, EventElementType } from 'src/app/model/ChronicleEvent';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { BACKEND_URL } from '../auth.service';
import { ChronicleService } from '../chronicle.service';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class GetFlankService {
  flankInfo : any;
  
  constructor(public data:ChronicleService, private http: HttpClient, private snackbar: SnackBarService) {  }

  basicRightFlank(streamId: number) {
    return this.http.get(BACKEND_URL + "show_right_flank/" + streamId, {responseType:"text"})
    // return this.http.get(this.data.getUrl() + "show_right_flank/" + this.currentStream.id, {responseType:"text"})
    // return this.http.get("http://127.0.0.1:8000/show_right_flank/0", {responseType:"text"});
  } 


  rightFlankFromJSON(json: any, stream: ChronicleStream): string{
      console.log("### Info: ###")
      console.log(json);
      

      // Collect General Info Strings:
      let brotherLeft = json[0].brother_left;
      let brotherRight = json[0].brother_right;

      let outputInfo : string = ""; // Reset Stream Info

      // Add "Brother Info":
      outputInfo += "Brother left: " + brotherLeft + "\nBrother right: " + brotherRight + "\n" + "id: " + json[0].id + "\n";

      // Output Index, Timestamp and Payload
      for (let i = 0; i < json[0].node_variant.ValueNode.data_array.length; i++) { // iterate through data array
        for (let e = 0; e < stream.event!.length; e++) { // iterate through events inside data node
          outputInfo += "\n"
            + "Timestamp: " + this.padLeft(this.getTimeStampFromJSON(json, stream.id, i), " ", 3)
            + " | Payload: " + this.getPayloadFromJSON(json, i, this.getPayloadTypeFromEvent(e, stream), e, stream)
            + " Type: " + this.getPayloadTypeFromEvent(e, stream);
        }
        // outputInfo += "\n"
      }
      return outputInfo;
  }

  getPayloadFromJSON(json: any, ValueNodeNo: number, payloadType: string, eventNo: number, stream: ChronicleStream) : string {
    // (Var)Compound Types:
    if (stream.compoundType == EventCompoundType.varCompound) {
      return json[0].node_variant.ValueNode.data_array[ValueNodeNo].payload.VarCompound[eventNo][this.getPayloadTypeFromEvent(eventNo, stream)];
    } 
    if (stream.compoundType == EventCompoundType.compound) {
      return json[0].node_variant.ValueNode.data_array[ValueNodeNo].payload.Compound[eventNo][this.getPayloadTypeFromEvent(eventNo, stream)];
    }  // TODO (maybe): Refactor to single if-Statement by getting Compound or VarCompound as string and using that as JSONarray index
    // TODO replace streamNo with 0 because it's always 0

    // Single Type:
    if (stream.compoundType == EventCompoundType.single) {
      return json[0].node_variant.ValueNode.data_array[ValueNodeNo].payload[payloadType];
    }
    return "No data retrieved!";
  }


  getPayloadTypeFromEvent(eventNo: number, stream: ChronicleStream) : string {
    let prefix = ""
    switch (stream.event![eventNo].type) {
      case EventElementType.integer:
        prefix = "I";
        break;
      case EventElementType.float:
        prefix = "F";
        break;
      case EventElementType.unsigned:
        prefix = "U";
        break;
      default: // leave prefix empty when type is string
        break;
    }
    console.log("Payload type in stream: event no " + eventNo + " is: " + prefix + stream.event![eventNo].subtype)
  return prefix + stream.event![eventNo].subtype;
  }


  getTimeStampFromJSON(json: any, streamNo: number, ValueNodeNo: number) : string {
    return json[0].node_variant.ValueNode.data_array[ValueNodeNo].t1;
  }

  /**
   * Füllt einen String links mit einem bestimmten Zeichen auf, damit er eine festgelegte Länge hat.
   * @param text text
   * @param padChar auffuellzeichen
   * @param size Laenge
   * @returns aufgefuellter String
   */
  padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
  }
}
