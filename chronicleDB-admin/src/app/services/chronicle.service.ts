import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventCompoundType, EventElementSingleOrList, EventElementSubtype, EventElementType } from '../model/ChronicleEvent';
import { ChronicleStream } from '../model/ChronicleStream';
import { EventParser } from './event-parser';
import { SnackBarService } from './snack-bar.service';


@Injectable({
  providedIn: 'root',
})
export class ChronicleService {
  private url!: string;

  private selectedStream = new BehaviorSubject<ChronicleStream|null>(null);
  selectedStream$ = this.selectedStream.asObservable();

  private streamListBS = new BehaviorSubject<ChronicleStream[]|null>(null);
  currentStreamList = this.streamListBS.asObservable();
  streamList : Array<ChronicleStream>=[];

  private currentStream: string = 'N/A';

  constructor(private http: HttpClient, private snackBar: SnackBarService) {}

  getHttp(){
    return this.http;
  }

  getUrl() {
    if (!this.url) {
      this.snackBar.openSnackBar("Please enter a URL to the Chronicle Server.")
    }
    return this.url;
  }

  setUrl(url: string) {
    this.url = url;
  }

  existsStream(): boolean {
    return this.currentStream != 'N/A';
  }

  getStreamInfo(): string {
    return this.currentStream;
  }

  setupTestStreamData() {
    this.selectedStream.next({
      id: 0, 
      event: [
        {singleOrList: EventElementSingleOrList.single, type: EventElementType.float, subtype: EventElementSubtype.sixtyfour},
        {singleOrList: EventElementSingleOrList.single, type: EventElementType.integer, subtype: EventElementSubtype.eight},
        {singleOrList: EventElementSingleOrList.single, type: EventElementType.string, subtype: EventElementSubtype.varString, size: 10},
        {singleOrList: EventElementSingleOrList.single, type: EventElementType.string, subtype: EventElementSubtype.constString, size: 10},
        {singleOrList: EventElementSingleOrList.constList, type: EventElementType.integer, subtype: EventElementSubtype.eight, size: 3},
        {singleOrList: EventElementSingleOrList.constList, type: EventElementType.float, subtype: EventElementSubtype.eight, size: 3},
        {singleOrList: EventElementSingleOrList.varList, type: EventElementType.integer, subtype: EventElementSubtype.eight, size: 3}
      ],
      compoundType: EventCompoundType.varCompound
    });
  }

  post(url: string, body: any) {
    return this.http.post(url, body, {responseType: "text"});
  }
  
  loadLastSelection(){
    //tbd
  }

  saveUpdatedStreamList(data :string){
    sessionStorage.setItem("streamList",data);
  }

  getStreamsFromChronicle(){
    this.streamList.length=0;
    this.http.get(this.url + "show_streams", {responseType: "json"}).subscribe(response => {
      for(let i of response as any){
        if(i[1]=="Online"){
          this.getHttp().get(this.getUrl() +"stream_info/"+i[0],{responseType:"text"}).subscribe(info =>{ 
            let newStream: ChronicleStream = {  
              id:parseInt(i[0]),
              event:EventParser.parseResponseEvent(info),
              compoundType: EventParser.parseCompoundType(info)
            }

            this.streamList.push(newStream)
            this.selectedStream.next(newStream); // put most recent stream as selected
          })
        }
      }
      this.saveUpdatedStreamList(JSON.stringify(this.streamList));
      return response;
    });
  }

  addStreamToList(response: any) {
    //get the posisiton of the StreamID in the response string
    let streamid = response.indexOf("StreamID:");
    let id = response.slice(streamid+9,response.indexOf("StreamConfig"));
    

    //push our created stream into our streams array  
    this.streamList.push({  
      id:parseInt(id),
      //the response event list is beeing parsed here
      event:EventParser.parseResponseEvent(response),
      compoundType: EventParser.parseCompoundType(response)
    });
    
    this.getStreamsFromChronicle();
    console.log(response);
    this.streamListBS.next(this.streamList);
  }
}
