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

  private streamProperties = new BehaviorSubject<any>('undefined');
  private eventProperties = new BehaviorSubject<any>('undefined');
  private eventCompoundObjectType= new BehaviorSubject<any>('undefined');
  currentEventCompoundObjectType = this.eventCompoundObjectType.asObservable();
  currentCreateStreamProperties = this.streamProperties.asObservable();
  currentEventProperties = this.eventProperties.asObservable();

  private selectedStream = new BehaviorSubject<ChronicleStream|null>(null);
  selectedStream$ = this.selectedStream.asObservable();

  private streamListBS = new BehaviorSubject<ChronicleStream[]|null>(null);
  currentStreamList = this.streamListBS.asObservable();
  
  streamList : Array<ChronicleStream>=[];
  testList:Array<ChronicleStream>=[];

  private currentStream: string = 'N/A';
  private subject = new Subject<any>();

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

  checkInput(): boolean {
    if ((this.streamProperties.value as string).match(/.*undefined.*/gi) != null) {
      // undefined in den properties
      this.snackBar.openSnackBar("There is a problem with the properties of the stream.");
      return false;
    } else if (!this.url || this.url.length < 8) {
      this.snackBar.openSnackBar("No valid URL given!");
      return false;
    } else if ((this.eventProperties.value as string).match(/.*((undefined)|(\[\])).*/gi) != null) {
      // undefined im Event
      this.snackBar.openSnackBar("The Event is not configured!");
      return false;
    }
    return true;
  }

  get createStreamBody(): string {
    return (this.streamProperties.value as string).replace(
      '<event-placeholder>',
      this.eventProperties.value
    );
  }

  createStream() {
    sessionStorage.setItem("chronicleURL",this.url)
    this.http.post(this.url + "create_stream", this.createStreamBody, {responseType: "text"}).subscribe(response => {
      //get the posisiton of the StreamID in the response string
      let streamid = response.indexOf("StreamID:")
      let id = response.slice(streamid+9,response.indexOf("StreamConfig"));
     

      //push our created stream into our streams array  
      this.streamList.push({  
        id:parseInt(id),
        //the response event list is beeing parsed here
        event:EventParser.parseResponseEvent(response),
        compoundType: this.eventCompoundObjectType.value});
        
        this.getStreamsFromChronicle();
      console.log(response);
      this.streamListBS.next(
        this.streamList)
    });
  }

  post(url: string, body: any) {
    return this.http.post(url, body, {responseType: "text"});
  }

  changeStreamUrl(url: string) {
    this.url = url;
  }

  changeStreamProperties(message: any) {
    this.streamProperties.next(message);
  }

  changeEventProperties(properties: any) {
    this.eventProperties.next(properties);
  }
  changeObjectCompound(type:EventCompoundType){
    this.eventCompoundObjectType.next(type);

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
          
          this.streamList.push({  
            id:parseInt(i[0]),
            event:EventParser.parseResponseEvent(info),
            compoundType: EventParser.parseCompoundType(info)})
          
        })
        }
      }
      this.saveUpdatedStreamList(JSON.stringify(this.streamList));
      return response;
  })
  }
  sendUpdateEvent() {
    this.subject.next();
  }
  getUpdateEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
  
}
