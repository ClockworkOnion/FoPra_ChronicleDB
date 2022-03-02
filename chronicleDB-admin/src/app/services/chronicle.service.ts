import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChronicleStream } from '../model/ChronicleStream';
import { inclusiveString, TimeTravelData } from '../time-travel/time-travel.component';
import { AuthService, BACKEND_URL } from './auth.service';
import { EventParser } from './event-parser';
import { SnackBarService } from './snack-bar.service';


@Injectable({
  providedIn: 'root',
})
export class ChronicleService {
  private _url!: string;
  private urlBS = new BehaviorSubject<string>("N/A");
  chronicleURL$ = this.urlBS.asObservable();

  get url() {
    return this._url;
  }

  isUrlReachable : boolean = true;

  private streamList : Array<ChronicleStream>=[];
  private streamListBS = new BehaviorSubject<ChronicleStream[]|null>(null);
  currentStreamList = this.streamListBS.asObservable();

  get snapshot() {
    return this.streamList;
  }

  getStream(id: number) : ChronicleStream | null {
    let result: ChronicleStream|null = null;
    this.streamList.forEach(stream => {
      if (stream.id == id) {
        result = stream;
      }
    });
    return result;
  }

  constructor(private http: HttpClient, private snackBar: SnackBarService, private authService : AuthService) {
    // this.url = localStorage.getItem("serverUrl") || "";
    this.getUrl().then(url => {
      this._url = url;
      this.urlBS.next(url);
    })
  }

  getHttp() : HttpClient {
    return this.http;
  }

  getUrl() : Promise<string> {
    return this.http.get<{url: string}>(BACKEND_URL + "get_server_url").pipe(map(url => url.url)).toPromise()
  }

  setUrl(url: string) {
    this._url = url;
    this.urlBS.next(url);
    // localStorage.setItem("serverUrl", url);
    this.http.post<string>(BACKEND_URL + "set_server_url", {url: url}).subscribe(res => {
      console.log("URL geändert");
    })
  }

  post(url: string, body: any) {
    return this.http.post(url, body, {responseType: "text"});
  }

  saveUpdatedStreamList(data :string){
    sessionStorage.setItem("streamList",data);
  }

  shutdownStream(id: number){
      this.http.get(BACKEND_URL +"shutdown_stream/" + id,{responseType:"text"}).subscribe(response =>{
        console.log("Sucessfully shut down Stream: " + id);
        this.getStreamsFromChronicle();
      } )
  }
  //from snapshot (still needs to pass down a body for correct implementation)
  recoverStream(id:number){
    this.http.get(BACKEND_URL +"recover_stream_snapshot/" +id,{responseType:"text"}).subscribe(response =>{
      console.log("Sucessfully recovered Stream: " + id +" " + response);
      this.getStreamsFromChronicle();
    })

  }

  getStreamsFromChronicle(){
    this.http.get(BACKEND_URL + "show_streams", {responseType: "json"}).subscribe(response => {

      // Update ob URL richtig
      this.isUrlReachable = true;

      // reset current data
      this.streamList = new Array<ChronicleStream>();

      // refill data
      for (let index = 0; index < (response as any).length; index++) {
        if (!this.authService.canUserAccessStream(index)) {
          continue;
        }

        const stream = (response as any)[index];
        
        if(stream[1]=="Online"){
          this.http.get(BACKEND_URL +"stream_info/"+stream[0],{responseType:"text"}).subscribe(async info =>{ 
            let newStream: ChronicleStream = {  
              id:parseInt(stream[0]),
              event:EventParser.parseResponseEvent(info),
              compoundType: EventParser.parseCompoundType(info),
              online: true,
              minKey:  await this.getMinKey(parseInt(stream[0])),
              maxKey:  await this.getMaxKey(parseInt(stream[0])),
              treeHeight: await this.getTreeHeight(parseInt(stream[0]))
            }

            this.streamList.push(newStream);
            this.streamList.sort((a, b) => a.id - b.id);  // sortieren nach id, da offline früher eingefügt wird als online, da HTTP
            this.streamListBS.next(this.streamList);
          });
        } else {
          let newStream: ChronicleStream = {
            id: parseInt(stream[0]),
            online: false,
            minKey: '',
            maxKey:"",
            treeHeight:""
          }
          this.streamList.push(newStream);
          this.streamListBS.next(this.streamList);
        }
      }
      
      this.saveUpdatedStreamList(JSON.stringify(this.streamList));
      return response;
    }, error => {
      if (error.statusText === "Unknown Error") {
        // Update ob URL richtig
        this.isUrlReachable = false;
        console.log("The entered URL is not reachable!");
      } else {
        console.error(error);
      }
    });
  }

  async getMaxKey(id :number){
   return   await this.http.get(BACKEND_URL +"max_key/"+id,{responseType:"text"}).toPromise();

  }

  async getMinKey(id:number){
    return   await this.http.get(BACKEND_URL +"min_key/"+id,{responseType:"text"}).toPromise();
  }

  async getTreeHeight(id:number){
    return   await this.http.get(BACKEND_URL +"tree_height/"+id,{responseType:"text"}).toPromise();
  }

  timeTravel(data : TimeTravelData, streamId: number) {
    let timeStamp1 = data.lowerBound;
    let timeStamp2 = data.upperBound;
    let useInclusive : boolean = (data.typeSelector == inclusiveString);

    this.snackBar.openSnackBar("Travelling "+ (useInclusive?"incl.":"excl.") + " from " + timeStamp1 + " to " + timeStamp2);
    // console.log("Travelling from " + timeStamp1 + " to " + timeStamp2);
    let inOrEx : string = useInclusive ? "Inclusive" : "Exclusive";
    let requestBody = '{"'+inOrEx+'":{"start":'+timeStamp1+',"end":'+timeStamp2+'}}';

    return this.http.post(BACKEND_URL +"query_time_travel/" + streamId, requestBody, {responseType:"text"});
  }

  async getStreamInfo(id: number) {     
    return await this.getHttp().get(BACKEND_URL +"stream_info/"+id,{responseType:"text"}).toPromise();
  }
}
