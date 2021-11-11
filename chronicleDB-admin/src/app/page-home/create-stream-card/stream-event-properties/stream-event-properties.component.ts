import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

interface Inputs {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-stream-event-properties',
  templateUrl: './stream-event-properties.component.html',
  styleUrls: ['./stream-event-properties.component.css']
})
export class StreamEventPropertiesComponent {
  data_level :any;
  
  data_title : any;
  dataTypeList =[];

  data_size :any;
  dataSizeList=[];

  stringSize: any = 5;
  

  constructor() {}
  
  eventList:any=[
    {
      "type1":"List", dataTypeList:[
        {"type2":"Integer",dataSizeList:[ "8","16","32","64"]},
        {"type2":"Unsigned",dataSizeList:[ "8","16","32","64"]},    
        {"type2":"Float",dataSizeList:["32","64"]}
      ]
    },
    {
      "type1":"Single",dataTypeList:[
        {"type2":"Integer",dataSizeList:[ "8","16","32","64"]},
        {"type2":"Unsigned",dataSizeList:[ "8","16","32","64"]},    
        {"type2":"Float",dataSizeList:["32","64"]},
        {"type2":"String",dataSizeList:["ConstString","VarString"]}
      ]
    },
  ];

  selectionChangeAction(typ:any){
    let dropDownData = this.eventList.find((data:any)=> data.type1 === typ);
    console.log(dropDownData);
    if(dropDownData){
      this.dataTypeList = dropDownData.dataTypeList;
      if(this.dataTypeList){
        this.data_title = (this.dataTypeList[0] as any).type2;
      }
    }else{
      this.dataTypeList =[]
    }

    this.selectionChangeAction2(this.data_title)
  }
  
  selectionChangeAction2(typ:any){
    let dropDownData : any = this.dataTypeList.find((data:any)=> data.type2 === typ);
    console.log(dropDownData);
    if(dropDownData){
      this.dataSizeList = dropDownData.dataSizeList;
      if(this.dataSizeList){
        this.data_size = this.dataSizeList[0];
      }
    }else{
      this.dataSizeList =[]
    }
  }  
}
