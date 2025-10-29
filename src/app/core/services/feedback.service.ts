import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {FeedbackService} from './interfaces/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackServiceImpl implements FeedbackService {
  private readonly httpClient = inject(HttpClient);

  sendFeedback(feedback: any): Observable<any> {
    return this.httpClient.post<any>('/api/feedback', feedback);
  }
}
