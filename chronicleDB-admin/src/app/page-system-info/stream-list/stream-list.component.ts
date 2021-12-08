import { StreamInfoService } from 'src/app/services/rest services/stream-info.service';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { InsertDataTabMenuComponent } from 'src/app/page-insert-data/insert-data-tab-menu/insert-data-tab-menu.component';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {
  streamList :Array<ChronicleStream>=[];

  constructor(private chronicleService : ChronicleService, private infoService:StreamInfoService , private dialog : DialogService) { 
    
  }

  ngOnInit(): void {
    this.chronicleService.currentStreamList.subscribe(list => {
      if (list)
        this.streamList = list;
    })
    let url: string = this.chronicleService.getUrl();
    if (url && url.length > 0) {
      this.chronicleService.getStreamsFromChronicle();
    }
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

  shutDown(id :number){
    this.chronicleService.shutdownStream(id)
  }

  open(){
    this.dialog.openDialog(InsertDataTabMenuComponent);
  }

 async showMaxKey(id:number){
    console.log( await this.chronicleService.getMaxKey(id))


  }
 async showMinKey(id :number){
    console.log( await this.chronicleService.getMinKey(id))
  }
 
}

