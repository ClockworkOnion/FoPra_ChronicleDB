import { Injectable } from '@angular/core';
import { ChronicleService } from './chronicle.service';

@Injectable({
  providedIn: 'root'
})
export class CreateStreamService {

  constructor(private chronicle: ChronicleService) { 
  }
  
}
