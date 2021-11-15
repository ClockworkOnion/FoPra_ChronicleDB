import { Component } from '@angular/core';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { EventgeneratorComponent } from './eventgenerator/eventgenerator.component';

@Component({
  selector: 'app-stream-event-property',
  templateUrl: './stream-event-property.component.html',
  styleUrls: ['./stream-event-property.component.css'],
})
export class StreamEventPropertyComponent {
  public unique_key!: number;
  public parentRef!: EventgeneratorComponent;
  dataSingleOrList :any;

  dataType: any;
  currentDataTypeList = [];

  dataSubtype: any;
  currentDataSubtypeList = [];

  stringOrListSize: any = 5;
  repeatedCharacter:string ="";

  
  
  constructor(private data: ChronicleService) {}
  
  eventList:any=[
    {
      "type1":"Single",dataTypeList:[
        {"type2":"Integer",dataSubtypeList:[{"display":"8 Bit", "value": "8"},{"display":"16 Bit", "value": "16"},{"display":"32 Bit", "value": "32"},{"display":"64 Bit", "value": "64"}]},
        {"type2":"Unsigned",dataSubtypeList:[{"display":"8 Bit", "value": "8"},{"display":"16 Bit", "value": "16"},{"display":"32 Bit", "value": "32"},{"display":"64 Bit", "value": "64"}]},    
        {"type2":"Float",dataSubtypeList:[{"display":"32 Bit", "value": "32"},{"display":"64 Bit", "value": "64"}]},
        {"type2":"String",dataSubtypeList:[{"display":"const length", "value": "ConstString"},{"display":"var length", "value": "VarString"}]}
      ]
    },
    {
      "type1":"List", dataTypeList:[
        {"type2":"Integer",dataSubtypeList:[{"display":"8 Bit", "value": "8"},{"display":"16 Bit", "value": "16"},{"display":"32 Bit", "value": "32"},{"display":"64 Bit", "value": "64"}]},
        {"type2":"Unsigned",dataSubtypeList:[{"display":"8 Bit", "value": "8"},{"display":"16 Bit", "value": "16"},{"display":"32 Bit", "value": "32"},{"display":"64 Bit", "value": "64"}]},    
        {"type2":"Float",dataSubtypeList:[{"display":"32 Bit", "value": "32"},{"display":"64 Bit", "value": "64"}]}
      ]
    },
  ];

  listOrSingleSelectionChanged(dataSingleOrList: any) {
    let dropDownData = this.eventList.find((data: any) => data.type1 === dataSingleOrList);
    if (dropDownData) {
      this.currentDataTypeList = dropDownData.dataTypeList;
      if (this.currentDataTypeList) {
        this.dataType = (this.currentDataTypeList[0] as any).type2;
      }
    } else {
      this.currentDataTypeList = [];
    }

    this.typeSelectionChanged(this.dataType);
  }

  typeSelectionChanged(dataType: any) {
    let dropDownData: any = this.currentDataTypeList.find((data: any) => data.type2 === dataType);
    if (dropDownData) {
      this.currentDataSubtypeList = dropDownData.dataSubtypeList;
      if (this.currentDataSubtypeList) {
        this.dataSubtype = (this.currentDataSubtypeList[0] as any).value;
      }
    } else {
      this.currentDataSubtypeList = [];
    }
  }

  //need to implement ConstList still!!!
  sendEvent(): any {
    if (this.dataSingleOrList === 'Single') {
      if (this.dataType === 'Integer') {
        return `{"I${this.dataSubtype}":0}`;
      }
      if (this.dataType === 'Unsigned') {
        return `{"U${this.dataSubtype}":0}`;
      }
      if (this.dataType === 'Float') {
        return `{"F${this.dataSubtype}":0.0}`;
      } else if (this.dataType === 'String') {
        let repeatedCharacter = 'x'.repeat(this.stringOrListSize);
        return `{"${this.dataSubtype}":"${repeatedCharacter}"}`;
      }
    } else {
      let arr = new Array<string>(this.stringOrListSize).fill('1');
      if (this.dataType === 'Integer') {
        return `{"VarI${this.dataSubtype}List":[${arr}]}`;
      }
        if(this.dataType==="Unsigned"){  
          return `{"VarU${this.dataSubtype}List":[${arr}]}`;      
      }else {
        let arr = new Array<string>(this.stringOrListSize).fill("1.0");
        return `{"VarF${this.dataSubtype}List":[${arr}]}`;

      }
    }
  }
  

  remove_me(){
    this.parentRef.removeComponent(this.unique_key);
  }
}
