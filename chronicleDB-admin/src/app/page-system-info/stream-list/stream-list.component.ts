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
  list :Array<ChronicleStream>=[];
  constructor(private data : ChronicleService) { }

  ngOnInit(): void {
    this.data.currentStreamList.subscribe((streamlist:any)=>this.list =streamlist)
  }
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ]; 
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }
  test(){
    for(let i =0;i<this.list.length;i++){
      let element:ChronicleStream = this.list[i]
      console.log(element.id);
      console.log(element.event);
      console.log(element.compoundType);
    }
    
    console.log(this.list)
  }

}
