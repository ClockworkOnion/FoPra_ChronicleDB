import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-java-create-stream',
  templateUrl: './java-create-stream.component.html',
  styleUrls: ['./java-create-stream.component.css']
})
export class JavaCreateStreamComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
