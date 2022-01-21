import { ChronicleService } from './../../../services/chronicle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChronicleStream } from 'src/app/model/ChronicleStream';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;
  loading =false;
  submitted = false;
  hide = true;
  private currentStreamList : Array<ChronicleStream>=[];
  arrayID :number[]=[];
  
  isAdmin :any;


  constructor(private formBuilder:FormBuilder,private chronicleService:ChronicleService){
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username:['', Validators.required],
      isAdmin:[false, Validators.required],
      password:['',Validators.required],
      allowedStreams:[],
      canCreateStream:[false]
      
    })
    
    this.chronicleService.getStreamsFromChronicle()
    this.currentStreamList = this.chronicleService.snapshot;
    for(let i of this.currentStreamList){
      this.arrayID.push(i.id)
    }
    console.log(this.arrayID)
  
}
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    //TODO save the user to the backend
}
test(){

  this.chronicleService.getStreamsFromChronicle()
  this.currentStreamList = this.chronicleService.snapshot;
  for(let i of this.currentStreamList){
    this.arrayID.push(i.id)
  }
  console.log(this.form.controls.username.value)
}
}
