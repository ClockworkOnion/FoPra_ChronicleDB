import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DialogService } from 'src/app/services/dialog.service';
import { InsertDataTabMenuComponent } from 'src/app/page-insert-data/insert-data-tab-menu/insert-data-tab-menu.component';
import { TimeTravelComponent } from 'src/app/time-travel/time-travel.component';
import { AuthService } from 'src/app/services/auth.service';
import { StreamInfoComponent } from 'src/app/stream-info/stream-info.component';
import { ShowRightFlankComponent } from 'src/app/show-right-flank/show-right-flank.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MinMaxTreeHeightComponent } from './min-max-tree-height/min-max-tree-height.component';
import { ChronicleRequest } from 'src/app/model/ChronicleJob';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {
  streamList :Array<ChronicleStream>=[];

  constructor(private chronicleService : ChronicleService, private dialog : DialogService, public authService : AuthService) { 
    
  }

  ngOnInit(): void {
    this.chronicleService.currentStreamList.subscribe(list => {
      if (list)
        this.streamList = list;
    })
    
    this.chronicleService.getUrl().then(url => {
      if (url && url.length > 0) {
        this.chronicleService.getStreamsFromChronicle();
      }
    });
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

  showInfo(id : number){
    this.dialog.openDialog(StreamInfoComponent, {data: {streamId: id}, maxHeight: "900px"});
  }

  shutDown(id :number){
    this.chronicleService.shutdownStream(id);
  }

  recover(id:number){
    this.chronicleService.recoverStream(id);
  }

  insertData(stream: ChronicleStream) {
    this.dialog.openDialog(InsertDataTabMenuComponent, {maxHeight: "600px", data: {stream: stream}});
  }

  timeTravel(id: number) {
    this.dialog.openDialog(TimeTravelComponent, {maxHeight: "800px", disableClose: true, data: {streamId: id}});
  }
  
  showRightFlank(stream:ChronicleStream){
    this.dialog.openDialog(ShowRightFlankComponent, {data: {stream: stream}});
  }

  async showMaxKey(id:number){
    // console.log( await this.chronicleService.getMaxKey(id))
    this.dialog.openDialog(MinMaxTreeHeightComponent,{data: {requestType: ChronicleRequest.MAX_KEY, streamId: id}});
  }

  async showMinKey(id:number){
    // console.log( await this.chronicleService.getMaxKey(id))
    this.dialog.openDialog(MinMaxTreeHeightComponent,{data: {requestType: ChronicleRequest.MIN_KEY, streamId: id}});
  }
  
  async showTreeHeight(id:number){
    // console.log( await this.chronicleService.getTreeHeight(id))
    this.dialog.openDialog(MinMaxTreeHeightComponent,{data: {requestType: ChronicleRequest.TREE_HEIGHT, streamId: id}});
  }
 
}