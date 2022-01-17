import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChronicleStream } from '../model/ChronicleStream';
import { AuthService } from './auth.service';
import { EventParser } from './event-parser';
import { SnackBarService } from './snack-bar.service';


@Injectable({
  providedIn: 'root',
})
export class ChronicleService {
  private url!: string;
  isUrlReachable : boolean = true;

  private selectedStream = new BehaviorSubject<ChronicleStream|null>(null);
  selectedStream$ = this.selectedStream.asObservable();

  private streamList : Array<ChronicleStream>=[];
  private streamListBS = new BehaviorSubject<ChronicleStream[]|null>(null);
  currentStreamList = this.streamListBS.asObservable();

  get snapshot() {
    return this.streamList;
  }

  constructor(private http: HttpClient, private snackBar: SnackBarService, private authService : AuthService) {
    this.url = localStorage.getItem("serverUrl") || "";
  }

  getHttp() : HttpClient {
    return this.http;
  }

  getUrl() : string {
    return this.url;
  }

  setUrl(url: string) {
    this.url = url;
    localStorage.setItem("serverUrl", url);
  }

  existsStream(): boolean {
    return this.selectedStream != null;
  }
  
  selectStream(stream: ChronicleStream) {
    this.selectedStream.next(stream);
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

  shutdownStream(id: number){
      this.http.get(this.url +"shutdown_stream/" + id,{responseType:"text"}).subscribe(response =>{
        console.log("Sucessfully shut down Stream: " + id);
        this.getStreamsFromChronicle();
      } )
  }
  //from snapshot (still needs to pass down a body for correct implementation)
  recoverStream(id:number){
    this.http.get(this.url +"recover_stream_snapshot/" +id,{responseType:"text"}).subscribe(response =>{
      console.log("Sucessfully recovered Stream: " + id +" " + response);
      this.getStreamsFromChronicle();
    })

  }

  getStreamsFromChronicle(){
    this.http.get(this.url + "show_streams", {responseType: "json"}).subscribe(response => {

      // Update ob URL richtig
      this.isUrlReachable = true;

      // reset current data
      this.streamList = new Array<ChronicleStream>();
      this.selectedStream.next(null);

      // refill data
      for (let index = 0; index < (response as any).length; index++) {
        if (!this.authService.canUserAccessStream(index)) {
          continue;
        }

        const stream = (response as any)[index];
        
        if(stream[1]=="Online"){
          this.http.get(this.url +"stream_info/"+stream[0],{responseType:"text"}).subscribe(info =>{ 
            let newStream: ChronicleStream = {  
              id:parseInt(stream[0]),
              event:EventParser.parseResponseEvent(info),
              compoundType: EventParser.parseCompoundType(info),
              online: true
            }

            this.streamList.push(newStream);
            this.streamList.sort((a, b) => a.id - b.id);  // sortieren nach id, da offline früher eingefügt wird als online, da HTTP
            this.streamListBS.next(this.streamList);
            this.selectedStream.next(newStream); // put most recent stream as selected
          });
        } else {
          let newStream: ChronicleStream = {  
            id:parseInt(stream[0]),
            online: false
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
   return   await this.http.get(this.url +"max_key/"+id,{responseType:"text"}).toPromise();

  }

  async getMinKey(id:number){
    return   await this.http.get(this.url +"min_key/"+id,{responseType:"text"}).toPromise();
  }

  async getTreeHeight(id:number){
    return   await this.http.get(this.url +"tree_height/"+id,{responseType:"text"}).toPromise();
  }

}
