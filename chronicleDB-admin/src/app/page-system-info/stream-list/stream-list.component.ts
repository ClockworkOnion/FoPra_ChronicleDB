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

  constructor(private data : ChronicleService, private infoService:StreamInfoService) { 
    
  }

  ngOnInit(): void {
    this.data.currentStreamList.subscribe((streamlist:any)=>this.streamList =streamlist)
    this.streamList= this.data.streamList;
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.streamList, event.previousIndex, event.currentIndex);
  }
  refresh(){
    if(this.data.getUrl()!=null){
      this.data.getStreamsFromChronicle();
      this.streamList.length=0;
    }
  }
  showInfo(id : number){
   // this.infoService.getStreamInfo(id);  
    
  }
 
}
