import { Component,  OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChronicleService } from 'src/app/services/chronicle.service';

@Component({
  selector: 'app-stream-properties',
  templateUrl: './stream-properties.component.html',
  styleUrls: ['./stream-properties.component.css'],
})
export class StreamPropertiesComponent implements OnInit {
  constructor(private data: ChronicleService) {
    this.fillDefaults();
  }

  message:any;
  eventProperties:any;

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

  compressorExtras=[];

  log : any[] = [
    {value: "true", viewValue:"true"},
    {value: "false", viewValue:"false"}
  ];
  debug: any[] = [
    { value: 'true', viewValue: 'true' },
    { value: 'false', viewValue: 'false' },
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
    {"compressorName":"none"},
    {"compressorName":"LZ4_Fast_No_Meta",compressorExtras:["I32"]},
    {"compressorName":"LZ4_Fast_With_Meta",compressorExtras:["I32"]},
    {"compressorName":"Sprintz",compressorExtras:["false","false","false"]},
    ];
  toppings = new FormControl(); 
  sprintzValues:any=[ "is_8bits", "is_delta"," write_size"]

  ngOnInit(): void {
    this.data.currentCreateStreamProperties.subscribe(message => this.message = message)
  }

  fillDefaults(){
    this.selectLogging ="false";
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
    this.inputMaxDeltaQueue="10";
    
    this.sendData();
  }

  //method to format Compressor inputs
  decideCompressorExtra(): string {
    if (this.selectCompressor === 'none') {
      return 'none';
    }
    if (
      this.selectCompressor === 'LZ4_Fast_No_Meta' ||
      this.selectCompressor === 'LZ4_Fast_With_Meta'
    ) {
      return `{"32I":${this.selectCompressorSize}}`;
    }
    if (this.selectCompressor === 'Sprintz') {
      return `{"Sprintz":[true,${this.selectCompressorSize},true,true]`;
    } else {
      return '';
    }
  }

  sendData(){
      //the String is prepared and build together here
      let streamPropertyData =`
      Log = ${this.selectLogging}
      Debug = ${this.selectDebugging}
      Data =  ${this.inputFileName}
      Translation = ${this.inputTranslationName}
      Boot = ${this.inputBootName}
      Multiple disk max queue = ${this.inputMaxQueue}
      Event = <event-placeholder>
      Lightweight index = {"aggregate":{"SMA":{"cnt":0,"sum":0.0,"min":0.0,"max":0.0}},"projector_sequence":"Mono"}
      LogicalBlock size = ${this.inputLogicalBlockSize}
      MacroBlock size = ${this.inputMacroBlockSize}
      MacroBlock spare = ${this.inputSpareSpace}
      MacroBlock preallocation = ${this.inputMacroBlockPreallocation}
      MacroBlock batch allocation = ${this.inputMacroBlockBatchallocation}
      MacroBlocks cache = ${this.inputBlockCache}
      Nodes cache = ${this.inputNodeCache}
      Compressor = ${this.selectCompressor}
      Compressor extras = ${this.decideCompressorExtra()}
      River threads = ${this.selectRiverThreads}
      Max delta queue = ${this.inputMaxDeltaQueue}`;

    //service sends the data to other components
    this.data.changeStreamProperties(streamPropertyData);
  }
}
