import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { EventService } from './shared/services/EventService';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), EventService, provideRouter(routes)],
}).catch((err) => console.error(err));
