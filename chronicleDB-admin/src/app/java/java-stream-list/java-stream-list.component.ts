import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ChronicleJavaStreamInfo } from 'src/app/model/JavaChronicle';
import { AuthService } from 'src/app/services/auth.service';
import { JavaChronicleService } from '../services/java-chronicle.service';

@Component({
  selector: 'app-java-stream-list',
  templateUrl: './java-stream-list.component.html',
  styleUrls: ['./java-stream-list.component.css']
})
export class JavaStreamListComponent implements OnInit {
  streamList: Array<ChronicleJavaStreamInfo> | null = []

  constructor(private javaChronicle: JavaChronicleService, public authService: AuthService) { }

  ngOnInit(): void {
    this.javaChronicle.currentStreamList.subscribe(list => this.streamList = list);
    this.refresh();
  }

  refresh() {
    this.javaChronicle.getStreamsFromChronicle();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.streamList!, event.previousIndex, event.currentIndex);
  }

  insertData(stream : ChronicleJavaStreamInfo){

  }

  showTreeHeight(name: string){

  }

  timeTravel(name: string){

  }

  showInfo(name: string){

  }
}
