import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export interface FeedbackService {
  sendFeedback(feedback: any): Observable<any>;
}

export const FEEDBACK_SERVICE = new InjectionToken<FeedbackService>(
  'FeedbackService',
);
