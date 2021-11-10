import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChronicleService {

  constructor() { }

  existsStream() : Boolean {
    return false; // TODO
  }

  getStreamInfo() : string {
    return "";
  }
}
