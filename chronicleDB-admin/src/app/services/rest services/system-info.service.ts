import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../auth.service';
import { ChronicleService } from '../chronicle.service';

@Injectable({
  providedIn: 'root'
})
export class SystemInfoService {

  constructor(public data:ChronicleService) { }


  getSystemInfo(){
    return this.data.getHttp().get(BACKEND_URL +"system_info",{responseType:"text"}) 
  }
}
