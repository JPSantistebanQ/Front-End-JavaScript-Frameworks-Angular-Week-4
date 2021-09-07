import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Leader } from '../shared/leader';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  getLeader(id: string): Observable<Leader> {
    return this.http
      .get<Leader>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getAllLeaders(): Observable<Leader[]> {
    return this.http
      .get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http
      .get<Leader[]>(baseURL + 'leadership?featured=true')
      .pipe(map((leaders) => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
