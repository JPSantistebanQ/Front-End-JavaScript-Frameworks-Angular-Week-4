import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { Feedback } from '../shared/feedback';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    if (feedback) {
      return this.restangular.all('feedback').post(feedback);
    }
  }
}
