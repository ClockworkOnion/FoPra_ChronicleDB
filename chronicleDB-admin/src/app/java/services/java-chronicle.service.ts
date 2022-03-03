import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ChronicleJavaQuery,
  ChronicleJavaStreamInfo,
} from 'src/app/model/JavaChronicle';
import { AuthService, BACKEND_URL } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class JavaChronicleService {
  constructor(
    private http: HttpClient,
    private snackBar: SnackBarService
  ) { }

  getHttp(): HttpClient {
    return this.http;
  }

  private streamList: Array<ChronicleJavaStreamInfo> = [];
  private streamListBS = new BehaviorSubject<ChronicleJavaStreamInfo[] | null>(
    null
  );
  currentStreamList = this.streamListBS.asObservable();

  get snapshot() {
    return this.streamList;
  }

  getStreamsFromChronicle() {
    this.http
      .get<Array<string>>(BACKEND_URL + 'native/get-streams')
      .subscribe((result) => {
        this.streamList = [];
        result.forEach((streamName) => {
          this.http
            .post<ChronicleJavaStreamInfo>(BACKEND_URL + 'native/stream-info', {
              name: streamName,
            })
            .subscribe((info) => {
              this.streamList.push(info);
              this.streamListBS.next(this.streamList);
            });
        });
      });
  }

  getStream(name: string): ChronicleJavaStreamInfo | null {
    let result: ChronicleJavaStreamInfo | null = null;
    this.streamList.forEach((stream) => {
      if (stream.name == name) {
        result = stream;
      }
    });
    return result;
  }

  async insert(name: string, events: any[]) {
    return await this.getHttp()
      .post(BACKEND_URL + 'native/insert', { streamName: name, events: events })
      .pipe(
        map((value) => {
          this.snackBar.openGreenSnackBar('Insertion Complete');
          return value;
        })
      )
      .toPromise();
  }

  async schema(
    name: string,
    control: { appendFrom: boolean; queryString: string }
  ) {
    return await this.getHttp()
      .post<any>(BACKEND_URL + 'native/schema', {
        queryString:
          control.queryString + (control.appendFrom ? ' FROM ' + name : ''),
      })
      .pipe(
        map((res) => {
          if (res.error) {
            this.snackBar.openRedSnackBar(res.error);
          }
          return res;
        })
      )
      .toPromise();
  }

  async query(name: string, control: { appendFrom: boolean; queryString: string; lowerBound: number; upperBound: number; }) {
    let request: ChronicleJavaQuery = {
      queryString: control.queryString + (control.appendFrom ? ' FROM ' + name : ''),
      startTime: control.lowerBound,
      endTime: control.upperBound,
    };
    return await this.getHttp()
      .post<any>(BACKEND_URL + 'native/query', request)
      .pipe(
        map((res) => {
          if (res.error) {
            this.snackBar.openRedSnackBar(res.error);
          }
          return res;
        })
      )
      .toPromise();
  }
}
