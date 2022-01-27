
import { Component, OnInit } from '@angular/core';
import { SystemInfoService } from 'src/app/services/rest services/system-info.service';

@Component({
  selector: 'app-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.css']
})
export class SystemInfoComponent implements OnInit {
   systemInfo :any;

  constructor(private service:SystemInfoService) { }
  
  ngOnInit(): void {
    this.service.getSystemInfo().subscribe(response =>{
      this.systemInfo = response;
      // console.log(this.systemInfo)
    });
  }
  onSystemInfoClicked(){
    this.service.getSystemInfo().subscribe(response =>{
      this.systemInfo = response;
      // console.log(this.systemInfo)
    });
    return this.systemInfo
  }
  
  
  
  
  
  

}
