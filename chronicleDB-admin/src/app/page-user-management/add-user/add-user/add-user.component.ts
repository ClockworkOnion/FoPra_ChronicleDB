import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './../../../services/snack-bar.service';
import { ChronicleService } from './../../../services/chronicle.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { BACKEND_URL } from 'src/app/services/auth.service';


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
  disableSelect  =false ;
 
  
  isAdmin :any;
  

  constructor(private formBuilder:FormBuilder,private chronicleService:ChronicleService, private snackBar:MatSnackBar){
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      //we should add validator so no username is used twice
      username:['', Validators.required],
      password:['',Validators.required],
      isAdmin:[false, Validators.required],
      canCreateStream:[false],
      allowedStreams:[[]],
      allowedInsertStreams:[[]],
      allStreamsAllowed:[false],
      canInsertAll:[false],   
    })
    
    this.chronicleService.getStreamsFromChronicle()
    this.currentStreamList = this.chronicleService.snapshot;
    for(let i of this.currentStreamList){
      this.arrayID.push(i.id)
    }
  
}

  updateCB(){
    this.form.controls['canCreateStream'].setValue(true);
    this.form.controls['canInsertAll'].setValue(true);
    this.form.controls['allStreamsAllowed'].setValue(true); 
      
    if (this.form.controls["isAdmin"].value) {
      this.form.controls.allowedStreams.reset();
      this.form.controls.allowedInsertStreams.reset();
      this.form.controls.allowedStreams.disable();
      this.form.controls.allowedInsertStreams.disable();
      this.form.controls.allowedStreams.setValue([]);
      this.form.controls.allowedInsertStreams.setValue([]);
  }else{
    this.form.controls.allowedStreams.enable();
    this.form.controls.allowedInsertStreams.enable();

  }
}
  get f() { return this.form.controls; }

  async onSubmit() {
    
    // reset alerts on submit
    const bol = await this.userAlreadyExists(this.form.controls.username.value)
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    if(bol){
      this.openFailureSnackBar();
      return
    }
    this.form.controls.allowedStreams.enable();
    this.form.controls.allowedInsertStreams.enable();
    let tmp = JSON.stringify(this.form.value)
    
    this.chronicleService.getHttp().post(BACKEND_URL+"create_user",JSON.parse(tmp)).subscribe((response:any) => {
   
  })
  this.openSuccessSnackBar();

}
async userAlreadyExists(username:string){
  let tmp = JSON.stringify(username)
   const t = await this.chronicleService.getHttp().post(BACKEND_URL+"exists_user",tmp).toPromise();
    return t
    
}

openSuccessSnackBar(){
  this.snackBar.open("Creating User was  Successful", "OK", {
    duration: 3000,
    panelClass: ['green-snackbar'],
   });
  }
openFailureSnackBar(){
    this.snackBar.open("Username Already Taken", "Try again!", {
      duration: 3000,
      panelClass: ['red-snackbar'],
      });
     }

}
