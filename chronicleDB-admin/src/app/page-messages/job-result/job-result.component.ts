import { Component, Input, OnInit } from '@angular/core';
import { JobResult } from 'src/app/model/ChronicleJob';
import { JobService } from 'src/app/services/job.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-job-result',
  templateUrl: './job-result.component.html',
  styleUrls: ['./job-result.component.css'],
})
export class JobResultComponent {
  panelOpenState = false;
  @Input() result!: JobResult;

  constructor(
    private jobService: JobService,
    private snackBar: SnackBarService
  ) {}

  onCopy(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.snackBar.openGreenSnackBar(
      'Copied Payload!'
    );
  }

  onDelete() {
    this.jobService.deleteResult(this.result);
  }
}
