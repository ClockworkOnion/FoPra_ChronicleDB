import { ChronicleService } from 'src/app/services/chronicle.service';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class StreamInfoService {
  public info:string ="blue";

  constructor(public chronicleService : ChronicleService) { 
    
  }
 
 async  getStreamInfo(id: number){     
    const res =  await this.chronicleService.getHttp().get(BACKEND_URL +"stream_info/"+id,{responseType:"text"}).toPromise();
     this.info=res;
     return res;
    }

}