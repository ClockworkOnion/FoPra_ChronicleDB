import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChronicleJob } from '../model/ChronicleJob';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-page-jobs',
  templateUrl: './page-jobs.component.html',
  styleUrls: ['./page-jobs.component.css']
})
export class PageJobsComponent implements OnInit, AfterViewInit {
  jobs: ChronicleJob[] = [];
  dataSource: MatTableDataSource<ChronicleJob> = new MatTableDataSource();
  displayedColumns: string[] = ['info', "startDate", "nextRun", "interval", "options"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public jobService: JobService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.jobService.getJobsFromBackend();
  }

  ngOnInit(): void {
    // console.error("Automatische Akutalisierung Deaktiviert!")
    this.jobService.userJobsBS$.subscribe(jobs => {
      this.jobs = jobs;
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

  sortData(sort: Sort) {
    const data = this.jobs.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'startDate':
          return compare(a.startDate.getTime(), b.startDate.getTime(), isAsc);
        case 'nextRun':
          return compare(a.nextRun.getTime(), b.nextRun.getTime(), isAsc);
        case 'interval':
          return compare(a.interval.value, b.interval.value, isAsc);
        case 'info':
          const aValue = a.info || a.requestType;
          const bValue = b.info || b.requestType;
          return compare(aValue.toLocaleLowerCase(), bValue.toLocaleLowerCase(), isAsc);
        default:
          return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

}
