import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { EventService } from '../shared/services/EventService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    EventService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: 'API_KEY',
      useValue: process.env['API_KEY']
    }
  ],
};
