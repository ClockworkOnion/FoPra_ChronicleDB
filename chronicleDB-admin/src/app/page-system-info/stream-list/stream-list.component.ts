import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {
  streamList :Array<ChronicleStream>=[];
  constructor(private data : ChronicleService) { }

  ngOnInit(): void {
    this.data.currentStreamList.subscribe((streamlist:any)=>this.streamList =streamlist)
    this.streamList=JSON.parse(sessionStorage.getItem("streamList")!);
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.streamList, event.previousIndex, event.currentIndex);
  }
  test(){
    for(let i =0;i<this.streamList.length;i++){
      let element:ChronicleStream = this.streamList[i]
      console.log(element.id);
      console.log(element.event);
      console.log(element.compoundType);
    }
    
    console.log(this.streamList)
  }
  showInfo(){
    console.log("hier kommt bald die info")
  }

}
