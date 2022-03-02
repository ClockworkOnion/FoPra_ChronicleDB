import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component} from '@angular/core';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { CreateStreamService } from 'src/app/services/rest services/create-stream.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.css']
})
export class CreateStreamComponent {
  constructor(public chronicleService: ChronicleService, public createService: CreateStreamService,public authService:AuthService,private router :Router) {
    chronicleService.getHttp();
    if(authService.usesJavaVersion){
      router.navigate(['/java/create_stream'])
    }
  

  }

  onCreateStreamClicked() {
    if (this.createService.checkInput()) {
      this.createService.createStream();
    }
  }
}
