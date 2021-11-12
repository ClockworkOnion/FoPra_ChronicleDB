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
translation:any[] =[
  {value: "translation", viewValue:"Translation"},
]
boot: any[]=[
  {value: ".boot", viewValue:"Boot"},
];
multipleDiskQueueCheckpoint: any[]=[
  "1","2","3","4","5","6","7","8","9","10"
];
lightweigtIndex :any ;
logBlockSizeControl = new FormControl("",[Validators.required,Validators.max(15)]);
matcher = new MyErrorStateMatcher();

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









  constructor() { }

  ngOnInit(): void {
  }

  
  

}
