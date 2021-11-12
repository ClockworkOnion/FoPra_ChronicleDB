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
  dataSingleOrList :any;
  
  dataType : any;
  currentDataTypeList =[];

  dataSize :any;
  currentDataSizeList=[];

  stringOrListSize: any = 5;
  

  constructor() {}
  
  eventList:any=[
    {
      "type1":"Single",dataTypeList:[
        {"type2":"Integer",dataSizeList:[ "8","16","32","64"]},
        {"type2":"Unsigned",dataSizeList:[ "8","16","32","64"]},    
        {"type2":"Float",dataSizeList:["32","64"]},
        {"type2":"String",dataSizeList:["ConstString","VarString"]}
      ]
    },
    {
      "type1":"List", dataTypeList:[
        {"type2":"Integer",dataSizeList:[ "8","16","32","64"]},
        {"type2":"Unsigned",dataSizeList:[ "8","16","32","64"]},    
        {"type2":"Float",dataSizeList:["32","64"]}
      ]
    },
  ];

  listOrSingleSelectionChanged(typ:any){
    let dropDownData = this.eventList.find((data:any)=> data.type1 === typ);
    if(dropDownData){
      this.currentDataTypeList = dropDownData.dataTypeList;
      if(this.currentDataTypeList){
        this.dataType = (this.currentDataTypeList[0] as any).type2;
      }
    }else{
      this.currentDataTypeList =[]
    }

    this.typeSelectionChanged(this.dataType)
  }
  
  typeSelectionChanged(typ:any){
    let dropDownData : any = this.currentDataTypeList.find((data:any)=> data.type2 === typ);
    if(dropDownData){
      this.currentDataSizeList = dropDownData.dataSizeList;
      if(this.currentDataSizeList){
        this.dataSize = this.currentDataSizeList[0];
      }
    }else{
      this.currentDataSizeList =[]
    }
  }  
}
