import { Component, OnInit } from '@angular/core';
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

  timeStamp1 : number = 0;
  timeStamp2 : number = 50;
  outputInfo : string = "Awaiting data..."
  flankInfo : any;
  private currentStream!: ChronicleStream|null;

  constructor(private chronicleService: ChronicleService, private snackBar: SnackBarService, private flankService: GetFlankService) {
    this.chronicleService.selectedStream$.subscribe(stream => {
      this.currentStream = stream;      
    });
  }
  ngOnInit(): void {
  }

  timeTravel(){
    this.snackBar.openSnackBar("Travelling from t" + this.timeStamp1 + " to t" + this.timeStamp2);
    console.log("Travelling from t" + this.timeStamp1 + " to t" + this.timeStamp2);
    let requestBody = '{"Exclusive":{"start":'+this.timeStamp1+',"end":'+this.timeStamp2+'}}';
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

}
