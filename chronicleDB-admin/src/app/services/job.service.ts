import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ChronicleJob, ChronicleRequest } from '../model/ChronicleJob';
import { AddJobComponent } from '../page-jobs/add-job/add-job.component';
import { StreamInfoComponent } from '../stream-info/stream-info.component';
import { ChronicleService } from './chronicle.service';
import { DialogService } from './dialog.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private userJobs: Array<ChronicleJob> = [];
  private userJobsBS = new BehaviorSubject<Array<ChronicleJob>>(this.userJobs);
  userJobsBS$ = this.userJobsBS.asObservable();

  constructor(
    private chronicle: ChronicleService,
    private dialog: DialogService,
    private snackBar: SnackBarService
  ) {
    this.userJobs = [
      {
        requestType: ChronicleRequest.MAX_KEY,
        startDate: new Date(),
        interval: { value: 60, text: '60s' },
        info: 'hallo hier ist max key',
      },
      {
        requestType: ChronicleRequest.STREAM_INFO,
        startDate: new Date(),
        interval: { value: 60, text: '60s' },
        config: {
          data: { streamId: 0, disableCreateJob: true },
          maxHeight: '900px',
        },
      },
    ];
    this.userJobsBS.next(this.userJobs);
  }

  public test = () => {
    this.chronicle.getMaxKey(0).then((text) => console.log(text));
  };

  get snapshot(): Array<ChronicleJob> {
    return this.userJobs;
  }

  createJob(requestType: ChronicleRequest, config?: MatDialogConfig<any>) {
    let result = this.dialog.openDialog(AddJobComponent);
    result.subscribe(
      (res: {
        timeStamp: Date;
        interval: { value: number; text: string };
        info?: string;
      }) => {
        this.userJobs.push({
          startDate: res.timeStamp,
          interval: res.interval,
          requestType: requestType,
          config: config,
          info: res.info,
        });

        this.snackBar.openGreenSnackBar('Successfully Created Job');
      }
    );
  }

  executeJob(job: ChronicleJob) {
    console.log(job);

    switch (job.requestType) {
      case ChronicleRequest.STREAM_INFO:
        this.dialog.openDialog(StreamInfoComponent, job.config); // data: {streamId: id}
        break;
      default:
        console.error(job.requestType + ' noch nicht implementiert!');
        break;
    }
  }

  deleteJob(job: ChronicleJob) {
    console.error('TODO deleteJob');
    this.userJobs.forEach((value, index) => {
      if (value == job) this.userJobs.splice(index, 1);
    });
    this.userJobsBS.next(this.userJobs);
  }
}
