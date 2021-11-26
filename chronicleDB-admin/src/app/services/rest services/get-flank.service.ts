import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChronicleService } from '../chronicle.service';

@Injectable({
  providedIn: 'root'
})
export class GetFlankService {

  constructor(public data:ChronicleService, private http: HttpClient) { }


  basicRightFlank() {
    return this.http.get('http://127.0.0.1:8000/show_right_flank/0' ,{responseType:"text"})
  } // TODO: Don't use hardcoded URL, get it from ChronicleService! Also allow switching streams (no hardcoded /0)


}
