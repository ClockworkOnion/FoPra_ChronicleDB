import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { CreateStreamService } from 'src/app/services/rest services/create-stream.service';

@Component({
  selector: 'app-general-stream',
  templateUrl: './general-stream.component.html',
  styleUrls: ['./general-stream.component.css'],
})
export class GeneralStreamComponent implements OnInit {
  createStreamProperties: any;
  eventProperties: any;
  chronicleUrl : FormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("(https?:\/\/.+(\.|:).+\/)")
  ]);

  

  constructor(
    public chronicleService: ChronicleService,
    private createService: CreateStreamService,
    public authService: AuthService,
    public router : Router
  ) { }

  updateURL(url: string) {
    if (this.chronicleUrl.valid)
      this.chronicleService.setUrl(url);
  }

  ngOnInit(): void {
    this.createService.currentCreateStreamProperties.subscribe(
      (message: any) => (this.createStreamProperties = message)
    );
    this.createService.currentEventProperties.subscribe(
      (message: any) => (this.eventProperties = message)
    );
    this.chronicleService.getUrl().then((url:string) => this.chronicleUrl.setValue(url));
  }

  createStreamClicked(){
    console.log("clicked")
    if(this.authService.usesJavaVersion){
      this.router.navigate(["java/create_stream"])
    } else {
      this.router.navigate(["rust/create_stream"])
    }
  }
}
