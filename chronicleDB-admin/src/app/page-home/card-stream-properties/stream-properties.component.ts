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
  /* this are specified in Stream.ini  dunno if neccessary to make input field for that
translation:any[] =[
  {value: "translation", viewValue:"Translation"},
]
boot: any[]=[
  {value: ".boot", viewValue:"Boot"},
];

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
  {
    "compressorName":"none",
    compressorExtras:[
      "none"
    ]
  },
  {
    "compressorName":"LZ4_Fast_No_Meta",
    compressorExtras:[
      "I32"
    ]

  },
  {
    "compressorName":"LZ4_Fast_With_Meta",
    compressorExtras:[
      "I32"
    ]

  },
  {
    "compressorName":"Sprintz",
    compressorExtras:[
      "is_8bits","data_dims", "is_delta"," write_size"
    ]
  },
  ];
  compressorChangeAction(compressor:any ) {
    this.compressorExtra="";
    let dropDownData = this.compressorList.find((data: any) => data.compressorName === compressor);
    if (dropDownData) {
      this.compressorExtras = dropDownData.compressorExtras;
      if(this.compressorExtras){
        this.compressorExtra=this.compressorExtras[0];
      }
      
    } else {
      this.compressorExtras = [];
    }

  }









  constructor() { }

  ngOnInit(): void {
  }

  
  

}
