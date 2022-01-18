import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { EventCompoundType } from '../model/ChronicleEvent';
import { ChronicleStream } from '../model/ChronicleStream';
import { ChronicleService } from '../services/chronicle.service';
import { GetFlankService } from '../services/rest services/get-flank.service';
import { SnackBarService } from '../services/snack-bar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BACKEND_URL } from '../services/auth.service';

@Component({
  selector: 'app-time-travel',
  templateUrl: './time-travel.component.html',
  styleUrls: ['./time-travel.component.css']
})
export class TimeTravelComponent implements OnInit {

  @ViewChild(MatTable) datatable!: MatTable<any>;
  columnNames : string[] = [] // table headers
  dataSource : any[] = []; // table row data

  timeStamp1 : number = 0; // timeTravel lower bound
  timeStamp2 : number = 50; // timeTravel upper bound
  outputInfo : string|null = null // string to be displayed inside HTML: if null, not displayed at all
  flankInfo : any; // for saving the REST HTTP response
  private currentStream!: ChronicleStream|null;
  toggleInclusive = new FormControl(false);
  useInclusive : boolean = false;

  constructor(private chronicleService: ChronicleService, private snackBar: SnackBarService, 
    private flankService: GetFlankService, public dialogRef: MatDialogRef<TimeTravelComponent>) {
    this.chronicleService.selectedStream$.subscribe(stream => {
      this.currentStream = stream;      
    });
  }

  ngOnInit():void{
    this.toggleInclusive.valueChanges.subscribe(val =>{
      console.log("Toggled useInclusive to " + val);
      this.useInclusive = val;
    })
  }

  timeTravel(){
    this.snackBar.openSnackBar("Travelling from t" + this.timeStamp1 + " to t" + this.timeStamp2);
    console.log("Travelling from t" + this.timeStamp1 + " to t" + this.timeStamp2);
    let inOrEx : string = this.useInclusive ? "Inclusive" : "Exclusive";
    let requestBody = '{"'+inOrEx+'":{"start":'+this.timeStamp1+',"end":'+this.timeStamp2+'}}';
    this.doTimeTravel(requestBody);
  }

  doTimeTravel(event:string) {
    let url = this.chronicleService.getUrl();
    if (!url || !this.currentStream) {
      return; 
    }

    this.chronicleService.getHttp()
      .post(BACKEND_URL + "query_time_travel/" + this.currentStream!.id, event, {responseType:"text"})
      .subscribe(response => {
        this.flankInfo = response;
        let json = JSON.parse(this.flankInfo);

        console.log("Response as text: " + response);
        console.log(json);

        this.outputInfo = "Response:\n"
        if (this.currentStream?.compoundType != EventCompoundType.single) { // Compound or VarCompound cases
          let comptype : string = "Compound"
          if (this.currentStream?.compoundType == EventCompoundType.varCompound) {
            comptype = "VarCompound";
          }

          this.createColumnHeaders(json, comptype);

          // Loop through JSON to create the output string
          for (let ts = 0; ts < json.length; ts++) { // Outer loop -- timestamps
            this.outputInfo += "Timestamp: " + json[ts].t1 + "\n"; // STRING: prepend timestamp

            let obj : any = {}; // TABLES : prepare empty object to fill
            obj["Timestamp"] = json[ts].t1; // TABLE : Insert timestamp

            for (let i = 0; i < json[ts].payload[comptype].length; i++) { // Inner loop -- compound data
              this.outputInfo += this.getValuePairsFromJSON(json[ts].payload[comptype][i]);
              for (var key in json[ts].payload[comptype][i]) { // TABLE: Create object for table
                obj[key] = json[ts].payload[comptype][i][key];
              }
            }
            this.dataSource.push(obj); // TABLE : Push the object to datasource
            this.outputInfo += "\n"
          }

        } else { //  cases where Compound type is single
          for (let ts = 0; ts < json.length; ts++) { // Outer loop -- timestamps
            this.outputInfo += "Timestamp: " + json[ts].t1 + "\n";
            for (let i = 0; i < json[0].payload.length; i++) { // Inner loop -- compound data
              this.outputInfo += this.getValuePairsFromJSON(json[ts].payload[i]);
            }
            this.outputInfo += "\n"
          }
          // TODO: Table display for non-compound
        }
        this.datatable.renderRows();
      });
  }

  createColumnHeaders(json : any, comptype : string) {
          this.columnNames.push("Timestamp");
          for (let l = 0; l < json[0].payload[comptype].length; l++) {
            for (var key in json[0].payload[comptype][l]) {
              if (!this.columnNames.includes(key)) {
                this.columnNames.push(key);
              }
            }
          }
  }

  getValuePairsFromJSON(obj: any) : string {
    let returnString : string = "";
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        returnString +=  key + " : " + obj[key] + "\n";
      }
    }
    return returnString;
  }

  valueChange() {
    console.log("Timestamp changed");
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

