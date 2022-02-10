import { Component, OnInit } from '@angular/core';
import { JobResult } from '../model/ChronicleJob';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-page-messages',
  templateUrl: './page-messages.component.html',
  styleUrls: ['./page-messages.component.css']
})
export class PageMessagesComponent implements OnInit {
  jobResults: JobResult[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.jobResultsBS$.subscribe(results => this.jobResults = results);
    this.jobService.getJobResultsFromBackend();
    this.jobService.markResultsAsRead();
  }

}
