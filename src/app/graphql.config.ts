import { HttpLink } from 'apollo-angular/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';

// The Spring Boot GraphQL endpoint:
const uri = 'http://localhost:8080/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri });
  // If needed, you can add an ApolloLink array for auth, logging, etc.
  return {
    link: ApolloLink.from([http]),
    cache: new InMemoryCache(),
  };
}

// This array can be spread into the `providers: []` array in your bootstrap.
export const GraphQLProviders = [
  {
   provide: APOLLO_OPTIONS,
   useFactory: createApollo,
   deps: [HttpLink]
  }
];

