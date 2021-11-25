import { Injectable } from '@angular/core';
import { ChronicleService } from '../chronicle.service';

@Injectable({
  providedIn: 'root'
})
export class InsertDataService {

  constructor(private chronicleService: ChronicleService) { }

  insertEvent(event:string[]) {
    // TODO
  }
}
