import { ApplicationConfig, inject, InjectionToken, makeStateKey, provideZoneChangeDetection, TransferState } from '@angular/core';
import { provideRouter, withComponentInputBinding, withNavigationErrorHandler } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { GraphQLProviders } from './graphql.config';
import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { GraphqlService } from './graphql.service';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';


const MY_APOLLO_CACHE = new InjectionToken<InMemoryCache>('apollo-cache');
const STATE_KEY = makeStateKey<NormalizedCacheObject>('apollo.state');

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ 
    eventCoalescing: true }),
    provideRouter(routes, 
      withComponentInputBinding(), 
      withNavigationErrorHandler((error) => console.error('Navigation Error:', error)),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    GraphqlService,
    { provide: MY_APOLLO_CACHE, useValue: new InMemoryCache() },
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const cache = inject(MY_APOLLO_CACHE);
      const transferState = inject(TransferState);
      const isBrowser = transferState.hasKey(STATE_KEY);

      if (isBrowser) {
        const state = transferState.get(STATE_KEY, {});
        cache.restore(state);
      } else {
        transferState.onSerialize(STATE_KEY, () => {
          const result = cache.extract();
          cache.reset(); // Reset cache to prevent sharing between SSR requests
          return result;
        });
      }

      return {
        link: httpLink.create({
           uri: 'http://localhost:8080/graphql',
           withCredentials: true,
           headers: new HttpHeaders({
            'Content-Type': 'application/json', // This is valid
            // Remove 'access-control-allow-origin', as it's not needed here
           // 'Authorization': 'Bearer <your-token>', // Optional: Example for passing an auth token if required
          }),
         }),
        cache: cache,
      };
    }),
  ]
};
