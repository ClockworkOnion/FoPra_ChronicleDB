import { MatDialogConfig } from '@angular/material/dialog';

export interface ChronicleJob {
  startDate: Date;
  nextRun: Date;
  interval: { value: number; text: string }; // in seconds
  requestType: ChronicleRequest;
  config?: MatDialogConfig<any>;
  info?: string;
}

export interface BackendJob {
  startDate: BackendTime;
  nextRun: BackendTime;
  interval: { value: number; text: string }; // in seconds
  requestType: ChronicleRequest;
  config?: MatDialogConfig<any>;
  info?: string;
}

export interface BackendTime {
  year: number, 
  month: number, 
  day: number, 
  hours: number, 
  minutes: number, 
  seconds: number
}

export enum ChronicleRequest {
  STREAM_INFO = 'Stream Info',
  SYSTEM_INFO = 'System Info',
  TIME_TRAVEL = 'Time Travel',
  RIGHT_FLANK = 'Right Flank',
  MAX_KEY = 'Max Key',
  MIN_KEY = 'Min Key',
  TREE_HEIGHT = 'Tree Height',
}

export interface JobResult {
  timeStamp: Date;
  payload: string;
  requestType: ChronicleRequest;
  info?: string;
}

export interface BackendJobResult {
  timeStamp: BackendTime;
  payload: string;
  requestType: ChronicleRequest;
  info?: string;
}
// Zeit umrechnen /////////////////////////////////////////////////////////////////////
export function dateToBackendTime(date: Date) : BackendTime {
  // Monat muss inkrementiert werden, da hier Januar=0
  return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()};
}

export function backendTimeToDate(date: BackendTime) : Date {
  // Monat muss dekrementiert werden, da hier Januar=0
  return new Date(date.year, date.month - 1, date.day, date.hours, date.minutes, date.seconds);
}

// Jobs umrechnen /////////////////////////////////////////////////////////////////////
export function chronicleJobToBackendJob(job: ChronicleJob) : BackendJob {
  return {
    startDate: dateToBackendTime(job.startDate),
    nextRun: dateToBackendTime(job.nextRun),
    interval: job.interval,
    requestType: job.requestType,
    config: job.config,
    info: job.info,
  };
}

export function backendJobToChronicleJob(job: BackendJob) : ChronicleJob {
  return {
    startDate: backendTimeToDate(job.startDate),
    nextRun: backendTimeToDate(job.nextRun),
    interval: job.interval,
    requestType: job.requestType,
    config: job.config,
    info: job.info,
  };
}

// Results umrechnen //////////////////////////////////////////////////////////////////
export function jobResultToBackendJobResult(job: JobResult) : BackendJobResult {
  return {
    timeStamp: dateToBackendTime(job.timeStamp),
    payload: job.payload,
    requestType: job.requestType,
    info: job.info
  };
}

export function backendJobResultToJobResult(job: BackendJobResult) : JobResult {
  return {
    timeStamp: backendTimeToDate(job.timeStamp),
    payload: job.payload,
    requestType: job.requestType,
    info: job.info
  };
}