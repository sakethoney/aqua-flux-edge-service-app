// In your graphql.config.ts (or wherever you create Apollo):
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';
import { APOLLO_OPTIONS } from 'apollo-angular';

export function createApollo(httpLink: HttpLink) {
  const uri = 'http://localhost:8080/graphql';

  // This link adds fetchOptions (mode: 'cors', etc.) to all requests
  const corsLink = setContext(() => ({
    fetchOptions: {
      mode: 'cors',
      // credentials: 'include', // If you need cookies
    },
  }));

  // Then create the standard HttpLink
  const http = httpLink.create({ uri });

  // Combine them
  const link = ApolloLink.from([corsLink, http]);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

export const GraphQLProviders = [
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  },
];
