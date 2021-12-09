import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ChronicleStream } from '../model/ChronicleStream';
import { ChronicleService } from '../services/chronicle.service';
import { GetFlankService } from '../services/rest services/get-flank.service';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-time-travel',
  templateUrl: './time-travel.component.html',
  styleUrls: ['./time-travel.component.css']
})
export class TimeTravelComponent implements OnInit {

  @ViewChild(MatTable) datatable!: MatTable<any>;

  timeStamp1 : number = 0;
  timeStamp2 : number = 50;
  outputInfo : string = "Awaiting data..."
  flankInfo : any;
  private currentStream!: ChronicleStream|null;
  toggleControl = new FormControl(false);
  useInclusive : boolean = false;

  constructor(private chronicleService: ChronicleService, private snackBar: SnackBarService, private flankService: GetFlankService) {
    this.chronicleService.selectedStream$.subscribe(stream => {
      this.currentStream = stream;      
    });
  }
  ngOnInit():void{
    this.toggleControl.valueChanges.subscribe(val =>{
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
      .post(url + "query_time_travel/" + this.currentStream!.id, event, {responseType:"text"})
      .subscribe(response => {
        this.flankInfo = response;
        let json = JSON.parse(this.flankInfo);

        console.log(response);
        console.log(json);
        this.outputInfo = "Received: \n" + this.makeResponsePretty(response) + " ...";
        console.log("JSON Drill\n");

        let payloadTypes : string[] = ["I8", "U8", "U16", "I16", "U32", "I32", "F32", "U64", "Compound"]; // Types to check for
        let typesToDisplay = new Set<string>(); // Remember which types have been seen
        let displayRows : tableRow[] = [];

        for (let i = 0; i < json.length; i++) {
          console.log(json[i].t1);
          let newRow : tableRow = new tableRow();

          payloadTypes.forEach(t => {
            if (json[i].payload[t] != undefined && t != "Compound") {
              console.log(t + " found!");
              typesToDisplay.add(t);
              newRow.timestamp = json[i].t1;
              switch (t) {
                case "I8":
                  newRow.i8 = json[i].payload[t];
                  console.log("Added " + json[i].payload[t] + " into new row");
                  break;
                case "I16":
                  newRow.i16 = json[i].payload[t];
                  break;
                case "F32":
                  newRow.f32 = json[i].payload[t];
                  break;
                case "Compound":
                  // TODO !!
                  break;
              
                default:
                  break;
              }
            }
          });

          displayRows.push(newRow);
        }

        this.tableTest2(displayRows, typesToDisplay);
        
      });
  }

  makeResponsePretty(r: string) {
    let pretty: string = r;
    pretty = pretty.substring(1, pretty.length-1);
    pretty =  pretty.replace(/,/g, "\n");
    pretty =  pretty.replace(/t/g, "T");
    pretty =  pretty.replace(/}}/g, "\n");
    pretty =  pretty.replace(/{/g, "");
    pretty =  pretty.replace(/"/g, "");
    pretty =  pretty.replace(/:/g, " : ");
    pretty =  pretty.replace(/payload/g, "Payload Type/Value");
    return pretty;
  }

  valueChange() {
    console.log("Timestamp changed");
  }

  dataSource : tableRow[] = [
    {timestamp:"1", value:"23", type:"I8"},
    {timestamp:"2", value:"43", type:"I8"},
    {timestamp:"4", value:"63", type:"I8"},
  ];

  testData : tableRow[] = [
    {timestamp:"2", value:"2", type:"I8"},
    {timestamp:"4", value:"433", type:"I8"},
    {timestamp:"6", value:"634", type:"I8"},
  ];

  columnNames : string[] = ['timestamp', 'value', 'type', 'type'];

  tableTest() {
    this.columnNames = ['timestamp', 'value', 'type', 'type']
    this.datatable.renderRows();
  }

  tableTest2(rows : tableRow[], types : Set<string>) {
    this.dataSource = rows;
    this.columnNames = ["timestamp"]
    types.forEach(t => {
      this.columnNames.push(t);
    });
    this.datatable.renderRows();
  }

}

export class tableRow {

  "timestamp" : string;
  type? : string;
  value?: string;
  i8?: string;
  i16?: string;
  f32?: string;
  f64?: string;
  // etc etc (TODO)
}
