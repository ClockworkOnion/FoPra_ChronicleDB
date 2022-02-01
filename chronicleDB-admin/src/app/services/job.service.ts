import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ShowRightFlankComponent } from '../components/show-right-flank/show-right-flank.component';
import { ChronicleJob, ChronicleRequest } from '../model/ChronicleJob';
import { AddJobComponent } from '../page-jobs/add-job/add-job.component';
import { StreamInfoComponent } from '../stream-info/stream-info.component';
import { TimeTravelComponent } from '../time-travel/time-travel.component';
import { ChronicleService } from './chronicle.service';
import { DialogService } from './dialog.service';

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
    private snackBar: MatSnackBar, 
    private router: Router
  ) {
    this.userJobs = [
      {
        requestType: ChronicleRequest.MAX_KEY,
        startDate: new Date(),
        nextRun: new Date(new Date().getTime() + (60*60*1000)),
        interval: { value: 60*60, text: '1 Hour' },
        info: 'hallo hier ist max key',
      },
      {
        requestType: ChronicleRequest.STREAM_INFO,
        startDate: new Date(),
        nextRun: new Date(new Date().getTime() + (86400*1000)),
        interval: { value: 86400, text: '1 Day' },
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
        let nextDate = new Date(res.timeStamp.getTime() + (res.interval.value*1000));
        this.userJobs.push({
          startDate: res.timeStamp,
          nextRun: nextDate,
          interval: res.interval,
          requestType: requestType,
          config: config,
          info: res.info,
        });

        // this.snackBar.openGreenSnackBar('Successfully Created Job');
        this.openSucceccfullSnackBar();
      }
    );
  }

  executeJob(job: ChronicleJob) {
    console.log(job);
    console.log(JSON.stringify(job));

    switch (job.requestType) {
      case ChronicleRequest.STREAM_INFO:
        this.dialog.openDialog(StreamInfoComponent, job.config); // data: {streamId: id}
        break;
      case ChronicleRequest.RIGHT_FLANK:
        this.dialog.openDialog(ShowRightFlankComponent, job.config); // data: {streamId: id}
        break;
      case ChronicleRequest.TIME_TRAVEL:
        this.dialog.openDialog(TimeTravelComponent, job.config); // data: {streamId: id}
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

  openSucceccfullSnackBar() {
    let snackBarRef = this.snackBar.open(
      'Successfully Created a new Job',
      'View',
      {
        duration: 4000,
        panelClass: ['green-snackbar'],
      }
    );
    snackBarRef.onAction().subscribe(() => {
      this.router.navigateByUrl("/jobs");
    });
  }
}
