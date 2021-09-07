import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private http: HttpClient, 
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  }
}
