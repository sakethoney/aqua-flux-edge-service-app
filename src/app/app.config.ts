import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withNavigationErrorHandler } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { GraphQLProviders } from './graphql.config';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ 
    eventCoalescing: true }),
    provideRouter(routes, 
      withComponentInputBinding(), 
      withNavigationErrorHandler((error) => console.error('Navigation Error:', error)),
    ),
    provideClientHydration(withEventReplay()),
    ...GraphQLProviders]
};
