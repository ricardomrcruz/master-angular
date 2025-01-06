import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

// providedin permits the app to access this dependency eveywhere in the app
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private subject = new Subject();

  emit(eventName: string, payload: any) {
    this.subject.next({ eventName, payload });
  }

  listen(eventName: string, callback: (event: any) => void) {
    this.subject.asObservable().subscribe((nextObj: any) => {
      if (eventName === nextObj.eventName) {
        callback(nextObj.payload);
      }
    });
  }
}
