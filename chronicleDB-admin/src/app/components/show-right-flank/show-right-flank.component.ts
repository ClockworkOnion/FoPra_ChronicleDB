import { Component, OnInit } from '@angular/core';
import { EventCompoundType, EventElementType } from 'src/app/model/ChronicleEvent';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { GetFlankService } from 'src/app/services/rest services/get-flank.service';

@Component({
  selector: 'app-show-right-flank',
  templateUrl: './show-right-flank.component.html',
  styleUrls: ['./show-right-flank.component.css']
})
export class ShowRightFlankComponent implements OnInit {
  selectedStream!: ChronicleStream;

  constructor(private getFlankService:GetFlankService, private chronicle:ChronicleService) { }
  flankInfo: any;
  outputInfo: string = "";

  ngOnInit(): void {
    this.chronicle.selectedStream$.subscribe(stream => {
      if (stream) {
        this.selectedStream = stream;
      }
    })
  }

  showRightFlank(){
    this.getFlankService.basicRightFlank().subscribe(response =>{
      this.flankInfo = response;
      console.log("### Info: ###")
      let json = JSON.parse(this.flankInfo);
      console.log(json);

      // Collect General Info Strings:
      let brotherLeft = json[this.selectedStream.id].brother_left;
      let brotherRight = json[this.selectedStream.id].brother_right;

      this.outputInfo = ""; // Reset Stream Info

      // Add "Brother Info":
      this.outputInfo += "Brother left: " + brotherLeft + "\nBrother right: " + brotherRight + "\n";
      // Output Index, Timestamp and Payload
      for (let i = 0; i < json[this.selectedStream.id].node_variant.ValueNode.data_array.length; i++) { // iterate through data array
        for (let e = 0; e < this.selectedStream.event!.length; e++) { // iterate through events inside data node
          this.outputInfo += "\n Index: " + i
            + " Timestamp: " + this.getTimeStampFromJSON(json, this.selectedStream.id, i)
            + " Payload: " + this.getPayloadFromJSON(json, this.selectedStream.id, i, this.getPayloadTypeFromEvent(this.selectedStream.id, e), e) 
            + " Type: " + this.getPayloadTypeFromEvent(this.selectedStream.id, e);
        }
        this.outputInfo += "\n"
      }
    });
  }


  debugGetStreamInfo() { 
    console.log("Stream Info:");
    console.log(this.selectedStream);
    console.log(this.selectedStream.event);
    this.selectedStream.event!.forEach(element => {
      console.log(element);
    });
    console.log(this.selectedStream.compoundType)


    console.log("Payload Type:")
    this.selectedStream.event!.forEach(e => {
      console.log(e.subtype)
      console.log(e.type)
    });
    console.log("Payload (stream 0, event 0) nach Methode: "+ this.getPayloadTypeFromEvent(0,0)); 
  }

  getPayloadFromJSON(json: any, streamNo: number, ValueNodeNo: number, payloadType: string, eventNo: number) : string {
    // (Var)Compound Types:
    if (this.selectedStream.compoundType == EventCompoundType.varCompound) {
      return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].payload.VarCompound[eventNo][this.getPayloadTypeFromEvent(this.selectedStream.id, eventNo)];
    } 
    if (this.selectedStream.compoundType == EventCompoundType.compound) {
      return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].payload.Compound[eventNo][this.getPayloadTypeFromEvent(this.selectedStream.id, eventNo)];
    }  // TODO (maybe): Refactor to single if-Statement by getting Compound or VarCompound as string and using that as JSONarray index

    // Single Type:
    if (this.selectedStream.compoundType == EventCompoundType.single) {
      return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].payload[payloadType];
    }
    return "No data retrieved!";
  }

  getTimeStampFromJSON(json: any, streamNo: number, ValueNodeNo: number) : string {
    return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].t1;
  }

  getPayloadTypeFromEvent(streamNo: number, eventNo: number) : string {
    let prefix = ""
    switch (this.selectedStream.event![eventNo].type) {
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
    console.log("Payload type in stream no " + streamNo + ", event no " + eventNo + " is: " + prefix + this.selectedStream.event![eventNo].subtype)
  return prefix + this.selectedStream.event![eventNo].subtype;
  }

}
