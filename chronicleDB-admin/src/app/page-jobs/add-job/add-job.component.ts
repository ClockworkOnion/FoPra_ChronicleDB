import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  intervalArray: Array<{value: number, text: string}> = [
    {value: 60, text:"1 Minute"},
    {value: 600, text:"10 Minutes"},
    {value: 3600, text:"1 Hour"},
    {value: 10800, text:"3 Hours"},
    {value: 18000, text:"5 Hours"},
    {value: 86400, text:"1 Day"},
    {value: 604800, text:"1 Week"}
  ]

  formGroup!: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddJobComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      date: [new Date(), Validators.required],
      time: ['12:00', Validators.required],
      interval: ["", Validators.required],
      info: [""],
    });
  }

  onSubmit() {
    let value: {date: Date, time: string, interval: {value: number, text: string}, info: string} = this.formGroup.value;
    let timeStamp:Date = value.date;
    let timeElements: string[] = value.time.split(":");
    timeStamp.setHours(parseInt(timeElements[0]), parseInt(timeElements[1]), 0, 0);

    this.dialogRef.close({
      timeStamp: timeStamp, 
      interval: value.interval, 
      info: (value.info? value.info : undefined)
    });
  }

  addInterval(interval: string) {
    if (interval.length > 0)
      this.intervalArray.push({value: parseInt(interval), text: `${interval} Seconds`})
  }

}
