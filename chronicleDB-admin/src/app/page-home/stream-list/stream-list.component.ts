import { StreamInfoService } from 'src/app/services/rest services/stream-info.service';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DialogService } from 'src/app/services/dialog.service';
import { InsertDataTabMenuComponent } from 'src/app/page-insert-data/insert-data-tab-menu/insert-data-tab-menu.component';
import { TimeTravelComponent } from 'src/app/time-travel/time-travel.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {
  streamList :Array<ChronicleStream>=[];

  constructor(private chronicleService : ChronicleService, private infoService:StreamInfoService , private dialog : DialogService, public authService : AuthService) { 
    
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
    this.chronicleService.shutdownStream(id);
  }

  recover(id:number){
    this.chronicleService.recoverStream(id);
  }

  insertData(stream: ChronicleStream) {
    this.chronicleService.selectStream(stream);
    this.dialog.openDialog(InsertDataTabMenuComponent, {maxHeight: "600px"});
  }

  timeTravel(stream: ChronicleStream) {
    this.chronicleService.selectStream(stream);
    this.dialog.openDialog(TimeTravelComponent, {maxHeight: "800px"});
  }

 async showMaxKey(id:number){
    console.log( await this.chronicleService.getMaxKey(id))


  }
 async showMinKey(id :number){
   let res =await this.chronicleService.getMinKey(id);
   console.log( res)
  //var output = document.getElementById("output");
    
   //output!.innerHTML = res;
  }

  async showTreeHeight(id:number){
    console.log( await this.chronicleService.getTreeHeight(id))


  }
 
}

