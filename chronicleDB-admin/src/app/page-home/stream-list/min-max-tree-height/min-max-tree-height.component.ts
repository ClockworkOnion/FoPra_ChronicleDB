import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChronicleRequest } from 'src/app/model/ChronicleJob';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { JobService } from 'src/app/services/job.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-min-max-tree-height',
  templateUrl: './min-max-tree-height.component.html',
  styleUrls: ['./min-max-tree-height.component.css']
})
export class MinMaxTreeHeightComponent {
  title: string;
  body: string = "";

  constructor(
    public dialogRef: MatDialogRef<MinMaxTreeHeightComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {requestType: ChronicleRequest, streamId: number, disableCreateJob?: boolean},
    private jobService: JobService, private chronicle: ChronicleService,
    private snackBar: SnackBarService
    ) { 
      this.title = data.requestType;
      switch (data.requestType) {
        case ChronicleRequest.MAX_KEY:
          chronicle.getMaxKey(data.streamId).then(value => this.body = value);
          break;
        case ChronicleRequest.MIN_KEY:
          chronicle.getMinKey(data.streamId).then(value => this.body = value);
          break;
        case ChronicleRequest.TREE_HEIGHT:
          chronicle.getTreeHeight(data.streamId).then(value => this.body = value);
          break;
      
        default:
          snackBar.openRedSnackBar("Error displaying data of the stream!");
          console.error("Diese Komponente darf nur MinKey, MaxKey oder TreeHeight haben.");
          break;
      }
  }

  createJob() {
    this.dialogRef.close();
    this.jobService.createJob(this.data.requestType, this.data.streamId, {data: {requestType: this.data.requestType, streamId: this.data.streamId, disableCreateJob: true}})
  }
}
