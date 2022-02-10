import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';
import { ShowRightFlankComponent } from '../components/show-right-flank/show-right-flank.component';
import { ChronicleJob, ChronicleRequest, JobResult } from '../model/ChronicleJob';
import { MinMaxTreeHeightComponent } from '../page-home/stream-list/min-max-tree-height/min-max-tree-height.component';
import { AddJobComponent } from '../page-jobs/add-job/add-job.component';
import { StreamInfoComponent } from '../stream-info/stream-info.component';
import { TimeTravelComponent } from '../time-travel/time-travel.component';
import { AuthService, BACKEND_URL } from './auth.service';
import { ChronicleService } from './chronicle.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private userJobs: Array<ChronicleJob> = [];
  private userJobsBS = new BehaviorSubject<Array<ChronicleJob>>(this.userJobs);
  userJobsBS$ = this.userJobsBS.asObservable();
  
  private jobResults: Array<JobResult> = [];
  private jobResultsBS = new BehaviorSubject<Array<JobResult>>(this.jobResults);
  jobResultsBS$ = this.jobResultsBS.asObservable();


  numberOfUnreadMessages: number = 0;

  constructor(
    private chronicle: ChronicleService,
    private dialog: DialogService,
    private snackBar: MatSnackBar, 
    private router: Router,
    private authService: AuthService
  ) {
    const backendTimer = timer(1000, 60000); // nach 60s aktualisieren
    backendTimer.subscribe(val => {
      this.getJobResultsFromBackend()
    })
  }

  get snapshot(): Array<ChronicleJob> {
    return this.userJobs;
  }

  getJobsFromBackend() {
    this.chronicle.getHttp().get<{jobs: any[]}>(BACKEND_URL + `get_all_jobs/${this.authService.username}`, {responseType: "json"}).subscribe(jobs => {
      this.userJobs = [];
      jobs.jobs.forEach(job => {
        this.userJobs.push(this.parseJobFromBackend(job));
      })
      this.userJobsBS.next(this.userJobs);      
    });
  }

  getJobResultsFromBackend() {
    this.chronicle.getHttp().get<{logs: Array<JobResult>}>(BACKEND_URL + `get_user_log/${this.authService.username}`, {responseType: "json"}).subscribe(results => {
      let prevNumber = this.jobResults.length - this.numberOfUnreadMessages;
      this.jobResults = []
      results.logs.forEach(result => {
        this.jobResults.push(this.parseJobResultFromBackend(result));
      })
      
      this.numberOfUnreadMessages = Math.max(this.jobResults.length - prevNumber, 0);
      
      this.jobResults.sort((a: JobResult, b: JobResult) => this.compare(a.timeStamp.getTime(), b.timeStamp.getTime(), false))
      this.jobResultsBS.next(this.jobResults);
    });

  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private parseJobFromBackend(job: any) : ChronicleJob{
    return {
      interval: job.interval,
      config: job.config,
      info: job.info,
      requestType: job.requestType,
      startDate: new Date(job.startDate),
      nextRun: new Date(job.nextRun)
    }
  }

  private parseJobResultFromBackend(result: any) : JobResult{
    return {
      timeStamp: new Date(result.timeStamp),
      payload: result.payload,
      requestType: result.requestType,
      info: result.info
    }
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
        let newJob: ChronicleJob = {
          startDate: res.timeStamp,
          nextRun: nextDate,
          interval: res.interval,
          requestType: requestType,
          config: config,
          info: res.info,
        };

        this.chronicle.getHttp().post(BACKEND_URL + `add_scheduled_job`, newJob).subscribe(res => {          
          this.userJobs.push(newJob);
          this.openSucceccfullSnackBar();
        })
      }
    );
  }

  executeJob(job: ChronicleJob) {
    // console.log(job);
    // console.log(JSON.stringify(job));
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
      case ChronicleRequest.MIN_KEY:
        this.dialog.openDialog(MinMaxTreeHeightComponent, job.config);
        break;
      case ChronicleRequest.MAX_KEY:
        this.dialog.openDialog(MinMaxTreeHeightComponent, job.config);
        break;
      case ChronicleRequest.TREE_HEIGHT:
        this.dialog.openDialog(MinMaxTreeHeightComponent, job.config);
        break;
      default:
        console.error(job.requestType + ' noch nicht implementiert!');
        break;
    }
  }

  deleteJob(job: ChronicleJob) {
    this.chronicle.getHttp().post(BACKEND_URL + "delete_job", job).subscribe(res => {
      this.userJobs.forEach((value, index) => {
        if (value == job) this.userJobs.splice(index, 1);
      });
      this.userJobsBS.next(this.userJobs);
    })
  }

  deleteResult(jobResult: JobResult) {
    console.error("TODO delete JobResult in Backend");
    this.jobResults.forEach((value, index) => {
      if (value == jobResult) this.jobResults.splice(index, 1);
    });
    this.jobResultsBS.next(this.jobResults);
  }

  markResultsAsRead() {
    this.numberOfUnreadMessages = 0;
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
