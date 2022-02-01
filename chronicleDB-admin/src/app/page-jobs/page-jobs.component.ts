import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChronicleJob } from '../model/ChronicleJob';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-page-jobs',
  templateUrl: './page-jobs.component.html',
  styleUrls: ['./page-jobs.component.css']
})
export class PageJobsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<ChronicleJob> = new MatTableDataSource();
  displayedColumns: string[] = ['info', "time", "nextRun", "interval", "options"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private jobService: JobService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.jobService.userJobsBS$.subscribe(jobs => {
      this.dataSource.data = jobs;
    })
  }

  executeJob(job: ChronicleJob) {
    this.jobService.executeJob(job);
  }

  deleteJob(job: ChronicleJob) {
    this.jobService.deleteJob(job);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
