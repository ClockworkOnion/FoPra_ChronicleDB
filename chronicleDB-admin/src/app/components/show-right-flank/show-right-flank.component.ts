import { Component, OnInit } from '@angular/core';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { GetFlankService } from 'src/app/services/rest services/get-flank.service';

@Component({
  selector: 'app-show-right-flank',
  templateUrl: './show-right-flank.component.html',
  styleUrls: ['./show-right-flank.component.css']
})
export class ShowRightFlankComponent implements OnInit {
  streamList :Array<ChronicleStream>=[];

  ACTIVE_STREAM : number = 0 // will be made selectable by user later

  constructor(private service:GetFlankService, private chronicle:ChronicleService) { }
  flankInfo: any;
  outputInfo: string = "";

  ngOnInit(): void {
    this.chronicle.currentStreamList.subscribe((streamlist:any)=>this.streamList =streamlist)
    this.streamList=this.chronicle.streamList; // JSON.parse(sessionStorage.getItem("streamList")!);
  }

  showRightFlank(){
    this.service.basicRightFlank().subscribe(response =>{
      this.flankInfo = response;
      console.log("### Info: ###")
      let json = JSON.parse(this.flankInfo);
      console.log(json);

      // Collect General Info Strings:
      let brotherLeft = json[this.ACTIVE_STREAM].brother_left;
      let brotherRight = json[this.ACTIVE_STREAM].brother_right;

      this.outputInfo = ""; // Reset Stream Info

      // Add "Brother Info":
      this.outputInfo += "Brother left: " + brotherLeft + "\nBrother right: " + brotherRight + "\n";
      // Output Index, Timestamp and Payload
      for (let i = 0; i < json[this.ACTIVE_STREAM].node_variant.ValueNode.data_array.length; i++) {
        this.outputInfo += "\n Index: " + i
          + " Timestamp: " + this.getTimeStampFromJSON(json, this.ACTIVE_STREAM, i)
          + " Payload: " + this.getPayloadFromJSON(json, this.ACTIVE_STREAM, i, this.getPayloadTypeFromEvent(this.ACTIVE_STREAM, 0));
      }
    });
  }

  debugGetStreamInfo() { 
    console.log("Stream Info:");
    console.log(this.streamList);
    console.log(this.streamList[this.ACTIVE_STREAM]);

    console.log("Event count:" + this.streamList[this.ACTIVE_STREAM].event.length);

    console.log("Payload Type:")
    console.log(this.streamList[0].event[0].type);
    console.log(this.streamList[0].event[0].subtype);
    console.log("Payload (stream 0, event 0) nach Methode: "+ this.getPayloadTypeFromEvent(0,0)); 
  }

  getPayloadFromJSON(json: any, streamNo: number, ValueNodeNo: number, payloadType: string) : string {
    return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].payload[payloadType];
  }

  getTimeStampFromJSON(json: any, streamNo: number, ValueNodeNo: number) : string {
    return json[streamNo].node_variant.ValueNode.data_array[ValueNodeNo].t1;
  }

  getPayloadTypeFromEvent(streamNo: number, eventNo: number) : string {
    let prefix = ""
    switch (this.streamList[streamNo].event[eventNo].type) {
      case "Integer":
        prefix = "I";
        break;
      case "Float":
        prefix = "F";
        break;
      case "Unsigned":
        prefix = "U";
        break;
      default:
        break;
    }
    console.log("Payload type in stream no " + streamNo + ", event no " + eventNo + " is: " + prefix + this.streamList[streamNo].event[eventNo].subtype)
  return prefix + this.streamList[streamNo].event[eventNo].subtype;
  }

}