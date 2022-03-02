import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EventCompoundType } from 'src/app/model/ChronicleEvent';
import { BACKEND_URL } from '../auth.service';
import { ChronicleService } from '../chronicle.service';
import { EventParser } from '../event-parser';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CreateStreamService {
  private _isHttpRequestPending : boolean = false;
  get isHttpRequestPending() {
    return this._isHttpRequestPending;
  }

  private streamProperties = new BehaviorSubject<any>('undefined');
  private eventProperties = new BehaviorSubject<any>('undefined');
  private eventCompoundObjectType= new BehaviorSubject<any>('undefined');
  currentEventCompoundObjectType = this.eventCompoundObjectType.asObservable();
  currentCreateStreamProperties = this.streamProperties.asObservable();
  currentEventProperties = this.eventProperties.asObservable();

  constructor(private chronicle: ChronicleService, private snackBar: SnackBarService, private router: Router) { 
  }
  
  checkInput(): boolean {
    if ((this.streamProperties.value as string).match(/.*undefined.*/gi) != null) {
      // undefined in den properties
      this.snackBar.openSnackBarwithStyle("There is a problem with the properties of the stream.","red-snackbar");
      return false;
    } else if (!this.chronicle.url || this.chronicle.url.length < 8) {
      this.snackBar.openSnackBarwithStyle("No valid URL given!","red-snackbar");
      return false;
    } else if ((this.eventProperties.value as string).match(/.*((undefined)|(\[\])).*/gi) != null) {
      // undefined im Event
      this.snackBar.openSnackBarwithStyle("The Event is not configured!","red-snackbar");
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
    this._isHttpRequestPending = true;
    // sessionStorage.setItem("chronicleURL",this.chronicle.getUrl());
    let response = this.chronicle.post(BACKEND_URL + "create_stream", this.createStreamBody);
    response.subscribe(response => {
      this.snackBar.openSnackBarwithStyle("Successfully created a new Stream!","green-snackbar");
      this._isHttpRequestPending = false;
      this.navigateBackToHome();
    }, error => {
      this.snackBar.openSnackBarwithStyle("Failed creating a new Stream!","red-snackbar");
      this._isHttpRequestPending = false;
    });
  }

  navigateBackToHome() {
   this.router.navigateByUrl("/home");
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
}
