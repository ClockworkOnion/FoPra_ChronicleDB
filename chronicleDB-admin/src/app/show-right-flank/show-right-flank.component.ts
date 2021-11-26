import { Component, OnInit } from '@angular/core';
import { ChronicleService } from '../services/chronicle.service';
import { GetFlankService } from '../services/rest services/get-flank.service';

@Component({
  selector: 'app-show-right-flank',
  templateUrl: './show-right-flank.component.html',
  styleUrls: ['./show-right-flank.component.css']
})
export class ShowRightFlankComponent implements OnInit {

  constructor(private service:GetFlankService) { }
  flankInfo: any;

  ngOnInit(): void {
  }

  showRightFlank(){
    this.service.basicRightFlank().subscribe(response =>{
      this.flankInfo = response;
    console.log("Info:")
    let json = JSON.parse(this.flankInfo);
    console.log(json);
    console.log("Brother Left: " + json[0].brother_left)
    console.log("Payload 1: " + json[0].node_variant.ValueNode.data_array[0].payload["I8"]) // im Fall, dass Payload den Typ I8 hat!
    });
  }

}
