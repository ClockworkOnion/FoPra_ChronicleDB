import { JavaChronicleService } from './../../services/java-chronicle.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';
import { ChronicleJavaAttributeType } from 'src/app/model/JavaChronicle';

@Component({
  selector: 'app-java-create-stream',
  templateUrl: './java-create-stream.component.html',
  styleUrls: ['./java-create-stream.component.css']
})
export class JavaCreateStreamComponent implements OnInit {
 form!: FormGroup;
 types = Object.values(ChronicleJavaAttributeType);

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: DialogService,
    private fb:FormBuilder,
    public javaChronicleService :JavaChronicleService) {
      this.form=this.fb.group({
        //needs Validator for Unique Stream Name (propably through get info or something)
        streamName:["",Validators.required],
        schema: this.fb.array([]),
      })
     }

  ngOnInit(): void {
   
  }
  
  schema() : FormArray {
    return this.form.get("schema") as FormArray
  }

  newAttribute(): FormGroup {
    return this.fb.group({
      //needs Validator for Unique Attribute Name 
      name: '',
      type: '',
      properties:this.fb.group({
        nullable:[false],
        index:[false]
      }),
      
    })
  }
  addAttribute() {
    this.schema().push(this.newAttribute());
  }
  removeAttribute(i:number) {
    this.schema().removeAt(i);
  }

  onSubmit() {
    console.log(this.form.value);
  }

  createStreamClicked(){
    let tmp = JSON.stringify(this.form.value);
    console.log(tmp)
    /*
    this.javaChronicleService
      .getHttp()
      .post("http://localhost:8080/native/create-stream/", JSON.parse(tmp))
      .subscribe((response: any) => {
        console.log(response)
      });
      */
    //this.openSuccessSnackBar();

  }
  openSuccessSnackBar() {
    let snackBarRef = this.snackBar.open(
      'Creating Stream was  Successful',
      'OK',
      {
        duration: 6000,
        panelClass: ['green-snackbar'],
      }
    );
  }


}
