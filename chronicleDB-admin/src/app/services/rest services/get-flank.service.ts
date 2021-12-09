import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventCompoundType, EventElementType } from 'src/app/model/ChronicleEvent';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from '../chronicle.service';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class GetFlankService {

  currentStream! : ChronicleStream;
  flankInfo : any;
  
  constructor(public data:ChronicleService, private http: HttpClient, private snackbar: SnackBarService) {
    this.data.selectedStream$.subscribe(stream => {
      if (stream)
        this.currentStream = stream;
    });
  }

  basicRightFlank() {
    return this.http.get(this.data.getUrl() + "show_right_flank/" + this.currentStream.id, {responseType:"text"})
    // return this.http.get("http://127.0.0.1:8000/show_right_flank/0", {responseType:"text"});
  } 


  rightFlankFromJSON(json: any): string{
      console.log("### Info: ###")

      // Collect General Info Strings:
      let brotherLeft = json[this.currentStream.id].brother_left;
      let brotherRight = json[this.currentStream.id].brother_right;

      let outputInfo : string = ""; // Reset Stream Info

      // Add "Brother Info":
      outputInfo += "Brother left: " + brotherLeft + "\nBrother right: " + brotherRight + "\n";
      // Output Index, Timestamp and Payload
      for (let i = 0; i < json[this.currentStream.id].node_variant.ValueNode.data_array.length; i++) { // iterate through data array
        for (let e = 0; e < this.currentStream.event!.length; e++) { // iterate through events inside data node
          outputInfo += "\n Index: " + i
            + " Timestamp: " + this.getTimeStampFromJSON(json, this.currentStream.id, i)
            + " Payload: " + this.getPayloadFromJSON(json, this.currentStream.id, i, this.getPayloadTypeFromEvent(this.currentStream.id, e), e) 
            + " Type: " + this.getPayloadTypeFromEvent(this.currentStream.id, e);
        }
        outputInfo += "\n"
      }
      return outputInfo;
  }

  getPayloadFromJSON(json: any, streamNo: number, ValueNodeNo: number, payloadType: string, eventNo: number) : string {
    // (Var)Compound Types:
    if (this.currentStream.compoundType == EventCompoundType.varCompound) {
      return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].payload.VarCompound[eventNo][this.getPayloadTypeFromEvent(this.currentStream.id, eventNo)];
    } 
    if (this.currentStream.compoundType == EventCompoundType.compound) {
      return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].payload.Compound[eventNo][this.getPayloadTypeFromEvent(this.currentStream.id, eventNo)];
    }  // TODO (maybe): Refactor to single if-Statement by getting Compound or VarCompound as string and using that as JSONarray index
    // TODO replace streamNo with 0 because it's always 0

    // Single Type:
    if (this.currentStream.compoundType == EventCompoundType.single) {
      return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].payload[payloadType];
    }
    return "No data retrieved!";
  }


  getPayloadTypeFromEvent(streamNo: number, eventNo: number) : string {
    let prefix = ""
    switch (this.currentStream.event![eventNo].type) {
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
    console.log("Payload type in stream no " + streamNo + ", event no " + eventNo + " is: " + prefix + this.currentStream.event![eventNo].subtype)
  return prefix + this.currentStream.event![eventNo].subtype;
  }


  getTimeStampFromJSON(json: any, streamNo: number, ValueNodeNo: number) : string {
    return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].t1;
  }
}
