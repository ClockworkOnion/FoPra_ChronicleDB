import { StreamInfoService } from './../../services/rest services/stream-info.service';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {
  streamList :Array<ChronicleStream>=[];

  constructor(private chronicleService : ChronicleService, private infoService:StreamInfoService) { 
    
  }

  ngOnInit(): void {
    this.chronicleService.currentStreamList.subscribe(list => {
      if (list)
        this.streamList = list;
    })
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.streamList, event.previousIndex, event.currentIndex);
  }
  refresh(){
    if(this.chronicleService.getUrl()!=null){
      this.chronicleService.getStreamsFromChronicle();
      this.streamList.length=0;
    }
  }
 async showInfo(id : number){
   let res =await this.infoService.getStreamInfo(id);
    console.log(res)
  }
 
}
