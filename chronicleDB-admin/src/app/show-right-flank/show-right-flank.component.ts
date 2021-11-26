import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-right-flank',
  templateUrl: './show-right-flank.component.html',
  styleUrls: ['./show-right-flank.component.css']
})
export class ShowRightFlankComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showRightFlank() {
    console.log("Button pressed")
  }

}
