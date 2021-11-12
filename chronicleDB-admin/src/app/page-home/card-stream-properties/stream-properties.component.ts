import { PropertyWrite } from '@angular/compiler';
import { Component, NgModule, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-stream-properties',
  templateUrl: './stream-properties.component.html',
  styleUrls: ['./stream-properties.component.css']
})
export class StreamPropertiesComponent implements OnInit {
 selectLogging:any;
 selectDebugging:any;
 inputFileName:any ;
 inputTranslationName:any;
 inputBootName:any;
 inputMaxQueue:any
 inputLogicalBlockSize:any;
 inputMacroBlockSize:any;
 inputSpareSpace:any;
 inputMacroBlockPreallocation:any;
 inputMacroBlockBatchallocation:any;
 inputBlockCache:any;
 inputNodeCache:any;
 selectCompressor:any;
 selectCompressorExtra:any;
 selectCompressorSize:any;
 selectRiverThreads:any;
 inputMaxDeltaQueue:any;


  
  
  compressor: any;
  compressorExtras=[];
  compressorExtra :any;

  properties = ["property1"];
  propertyCount = 1;

  log : any[] = [
    {value: "true", viewValue:"true"},
    {value: "false", viewValue:"false"}
  ];
  debug : any[] = [
    {value: "true", viewValue:"true"},
    {value: "false", viewValue:"false"}
  ];
  /* 
Lightweight index				= {"aggregate":{"SMA":{"cnt":0,"sum":0.0,"min":0.0,"max":0.0}},"projector_sequence":"Mono"}
*/
lightweigtIndex :any ;
riverThreads : any[]=[
    {value: "0", viewValue:"Pipeline bypassed"},
    {value: "t", viewValue:"Number of CPU threads"},
    {value: "c", viewValue:"Number of CPU cores"},
    {value: "d", viewValue:"Default number threads"},
    {value: "<number> ", viewValue:"<number> of threads"},
    {value: "[t|c] - <number>", viewValue:"[t|c] - <number> of threads"}
]

compressorList:any =[
  {"compressorName":"none",compressorExtras:["none"]},
  {"compressorName":"LZ4_Fast_No_Meta",compressorExtras:["I32"]},
  {"compressorName":"LZ4_Fast_With_Meta",compressorExtras:["I32"]},
  {"compressorName":"Sprintz", compressorExtras:["is_8bits","data_dims", "is_delta"," write_size"]},
  ];

  compressorChangeAction(selectCompressor:any ) {
    this.selectCompressorExtra="";
    let dropDownData = this.compressorList.find((data: any) => data.compressorName === selectCompressor);
    if (dropDownData) {
      this.compressorExtras = dropDownData.compressorExtras;
      if(this.compressorExtras){
        this.selectCompressorExtra=this.compressorExtras[0];
      }
      
    } else {
      this.compressorExtras = [];
    }

  }
  submit(){
    
    console.log(this.selectLogging,
      this.selectDebugging,
      this.inputFileName,
      this.inputTranslationName,
      this.inputBootName,
      this.inputMaxQueue,
      this.inputLogicalBlockSize,
      this.inputMacroBlockSize,
      this.inputSpareSpace,
      this.inputMacroBlockPreallocation,
      this.inputMacroBlockBatchallocation,
      this.inputBlockCache,
      this.inputNodeCache,
      this.selectCompressor,
      this.selectCompressorExtra,
      this.selectCompressorSize,
      this.selectRiverThreads,
      this.inputMaxDeltaQueue)
  }
  fillDefaults(){
    this.selectLogging ="true";
      this.selectDebugging="false";
      this.inputFileName= "data0";
      this.inputTranslationName="translation"
      this.inputBootName =".boot";
      this.inputMaxQueue=10;
      this.inputLogicalBlockSize=32768,
      this.inputMacroBlockSize=10;
      this.inputSpareSpace=0.1;
      this.inputMacroBlockPreallocation =300;
      this.inputMacroBlockBatchallocation=300;
      this.inputBlockCache=2500;
      this.inputNodeCache=10000;
      this.selectCompressor="LZ4_Fast_No_Meta";
      this.selectCompressorExtra="I32";
      this.selectCompressorSize=12;
      this.selectRiverThreads = "t";
      this.inputMaxDeltaQueue="10"
      
  }









  constructor() { }

  ngOnInit(): void {
  }

  
  

}
