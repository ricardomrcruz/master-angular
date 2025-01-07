import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { EventService } from './shared/services/EventService';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), EventService],
}).catch((err) => console.error(err));
