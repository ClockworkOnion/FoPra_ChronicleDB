import { Injectable } from '@angular/core';
import { ChronicleService } from '../chronicle.service';

@Injectable({
  providedIn: 'root'
})
export class SystemInfoService {

  constructor(public data:ChronicleService) { }


  getSystemInfo(){
    return this.data.getHttp().get(this.data.getUrl() +"system_info",{responseType:"text"}) 
  }
}
