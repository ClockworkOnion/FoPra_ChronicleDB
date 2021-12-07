import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EventCompoundType } from 'src/app/model/ChronicleEvent';
import { ChronicleService } from '../chronicle.service';
import { EventParser } from '../event-parser';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CreateStreamService {
  private isHttpRequestPending = new BehaviorSubject<boolean>(false);
  isHttpRequestPending$ = this.isHttpRequestPending.asObservable();

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
      this.snackBar.openSnackBar("There is a problem with the properties of the stream.");
      return false;
    } else if (!this.chronicle.getUrl() || this.chronicle.getUrl().length < 8) {
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
    this.isHttpRequestPending.next(true);
    sessionStorage.setItem("chronicleURL",this.chronicle.getUrl())
    let response = this.chronicle.post(this.chronicle.getUrl() + "create_stream", this.createStreamBody)
    response.subscribe(response => {
      this.chronicle.addStreamToList(response);
      this.snackBar.openSnackBar("Successfully created a new Stream!");
      this.isHttpRequestPending.next(false);
      this.navigateBackToHome();
    }, error => {
      this.snackBar.openSnackBar("Failed creating a new Stream!");
      this.isHttpRequestPending.next(false);
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
