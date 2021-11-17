import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChronicleService {
  private createStreamProperties = new BehaviorSubject<any>('default message');
  private eventProperties = new BehaviorSubject<any>('default event properties');
  private url!: string;

  currentCreateStreamProperties = this.createStreamProperties.asObservable();
  currentEventProperties = this.eventProperties.asObservable();

  private currentStream: string = "N/A";

  constructor(private http: HttpClient) {}

  existsStream() : boolean {
    return this.currentStream != "N/A";
  }

  getStreamInfo() : string {
    return this.currentStream;
  }

  private fillStreamBodyText = (eventText: string) =>
    `
  Log = false
  Debug = false
  Data = data0
  Translation = translation
  Boot = .boot
  Multiple disk max queue = 10
  ${eventText}
  Lightweight index = {"aggregate":{"SMA":{"cnt":0,"sum":0.0,"min":0.0,"max":0.0}},"projector_sequence":"Mono"}
  LogicalBlock size = 32768
  MacroBlock size = 10
  MacroBlock spare = 0.1
  MacroBlock preallocation = 300
  MacroBlock batch allocation = 300
  MacroBlocks cache = 2500
  Nodes cache = 10000
  Compressor = Sprintz
  Compressor extras = {"Sprintz":[true,53,true,true]}
  River threads = 1
  Max delta queue = 10`;

  createStream(url: string, ...eventTypes: string[]) {
    // create the text of the Event line
    let eventString: string = 'Event = {"Compound":[';
    eventTypes.forEach((type) => {
      eventString = eventString.concat(type, ',');
    });
    eventString = eventString.substring(0, eventString.length - 1).concat(']}');
    let body: string = this.fillStreamBodyText(eventString);

    let response$ = this.post(url, body).subscribe();

    // TODO stream ID aus response abspeichern, und existsStream Methode etc

    return response$;
  }

  private post(url: string, body: any) {
    return this.http.post(url, body);
  }

  changeStreamUrl(url: string) {

  }

  changeCreateStreamProperties(message: any) {
    this.createStreamProperties.next(message);
  }

  changeEventProperties(properties: any) {
    this.eventProperties.next(properties);
  }
}
