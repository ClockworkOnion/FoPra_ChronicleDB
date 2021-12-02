import { ChronicleService } from 'src/app/services/chronicle.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StreamInfoService {
  public info:string ="blue";

  constructor(public chronicleService : ChronicleService) { 
    
  }
 
 async  getStreamInfo(id: number):Promise<string>{     
    const res :any =  await this.chronicleService.getHttp().get(this.chronicleService.getUrl() +"stream_info/"+id,{responseType:"text"}).toPromise();
     this.info=res;
     console.log(this.info)
     return this.info;
    }

}