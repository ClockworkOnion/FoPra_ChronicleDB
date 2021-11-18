import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ChronicleService {
  private streamProperties = new BehaviorSubject<any>('undefined');
  private eventProperties = new BehaviorSubject<any>('undefined');
  private url!: string;

  currentCreateStreamProperties = this.streamProperties.asObservable();
  currentEventProperties = this.eventProperties.asObservable();

  private currentStream: string = 'N/A';

  constructor(private http: HttpClient, private snackBar: SnackBarService) {}

  existsStream(): boolean {
    return this.currentStream != 'N/A';
  }

  getStreamInfo(): string {
    return this.currentStream;
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
    console.log(this.url);
    console.log(this.createStreamBody);
    this.http.post(this.url + "/create_stream", this.createStreamBody).subscribe(response => {
      console.log(response)
    });
  }

  private post(url: string, body: any) {
    return this.http.post(url, body);
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
}
