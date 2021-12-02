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
  updateEventsubscription:Subscription;
  streamList :Array<ChronicleStream>=[];
  stream :any;

  constructor(private data : ChronicleService, private infoService:StreamInfoService) { 
    this.updateEventsubscription=this.data.getUpdateEvent().subscribe(()=>{
      this.refresh();
    })
  }

  ngOnInit(): void {
    this.data.currentStreamList.subscribe((streamlist:any)=>this.streamList =streamlist)
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.streamList, event.previousIndex, event.currentIndex);
  }
  refresh(){
    if(this.data.getUrl()!=null){
    this.streamList=this.data.streamList;
    this.data.getStreamsFromChronicle();
  }
  }
  showInfo(id : number){
   // this.infoService.getStreamInfo(id);  
    
  }
 
}
