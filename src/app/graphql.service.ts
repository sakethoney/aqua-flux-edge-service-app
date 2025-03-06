// File: src/app/my-graphql.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

/* --- TS Interfaces for schema --- */

// "Artifact"
export interface Artifact {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// "Address"
export interface Address {
  id: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// "Person"
export interface Person {
  id: string;
  name?: string;
  age?: string;
  sex?: string;
  address?: Address[];
}

// "Product"
export interface Product {
  id: string;
  name?: string;
  price?: number;
  category?: string;
}

@Injectable({ providedIn: 'root' })
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  // ====== QUERIES ======

  // 1) getAllArtifacts
  getAllArtifacts(): Observable<Artifact[]> {
    return this.apollo
      .watchQuery<{ getAllArtifacts: Artifact[] }>({
        query: gql`
          query {
            getAllArtifacts {
              id
              name
              category
              price
              stock
            }
          }
        `,
      })
      .valueChanges.pipe(map((res) => res.data.getAllArtifacts));
  }

  // 2) findByCategory
  findByCategory(category: string): Observable<Artifact[]> {
    return this.apollo
      .watchQuery<{ findByCategory: Artifact[] }>({
        query: gql`
          query ($category: String!) {
            findByCategory(category: $category) {
              id
              name
              category
              price
              stock
            }
          }
        `,
        variables: { category },
      })
      .valueChanges.pipe(map((res) => res.data.findByCategory));
  }

  // 3) getPerson
  getPerson(): Observable<Person | null> {
    return this.apollo
      .watchQuery<{ getPerson: Person }>({
        query: gql`
          query {
            getPerson {
              id
              name
              age
              sex
              address {
                id
                street
                city
                state
                zipCode
              }
            }
          }
        `,
      })
      .valueChanges.pipe(map((res) => res.data.getPerson));
  }

  // 4) getAllPerson
  getAllPerson(): Observable<Person[]> {
    return this.apollo
      .watchQuery<{ getAllPerson: Person[] }>({
        query: gql`
          query {
            getAllPerson {
              id
              name
              age
              sex
              address {
                id
                street
                city
                state
                zipCode
              }
            }
          }
        `,
      })
      .valueChanges.pipe(map((res) => res.data.getAllPerson));
  }

  // 5) getAllProducts
  getAllProducts(): Observable<Product[]> {
    return this.apollo
      .watchQuery<{ getAllProducts: Product[] }>({
        query: gql`
          query {
            getAllProducts {
              id
              name
              price
              category
            }
          }
        `,
      })
      .valueChanges.pipe(map((res) => res.data.getAllProducts));
  }

  // ====== MUTATIONS ======

  // addArtifact
  addArtifact(
    name: string,
    category: string,
    price: number,
    stock: number
  ): Observable<Artifact> {
    return this.apollo
      .mutate<{ addArtifact: Artifact }>({
        mutation: gql`
          mutation (
            $name: String!
            $category: String!
            $price: Float!
            $stock: Int!
          ) {
            addArtifact(
              name: $name
              category: $category
              price: $price
              stock: $stock
            ) {
              id
              name
              category
              price
              stock
            }
          }
        `,
        variables: { name, category, price, stock },
      })
      .pipe(map((res) => res.data!.addArtifact));
  }

  // updateArtifact
  updateArtifact(
    id: string,
    name?: string,
    category?: string,
    price?: number,
    stock?: number
  ): Observable<Artifact | null> {
    return this.apollo
      .mutate<{ updateArtifact: Artifact }>({
        mutation: gql`
          mutation (
            $id: ID!
            $name: String
            $category: String
            $price: Float
            $stock: Int
          ) {
            updateArtifact(
              id: $id
              name: $name
              category: $category
              price: $price
              stock: $stock
            ) {
              id
              name
              category
              price
              stock
            }
          }
        `,
        variables: { id, name, category, price, stock },
      })
      .pipe(map((res) => res.data!.updateArtifact));
  }

  // deleteArtifact
  deleteArtifact(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteArtifact: boolean }>({
        mutation: gql`
          mutation ($id: ID!) {
            deleteArtifact(id: $id)
          }
        `,
        variables: { id },
      })
      .pipe(map((res) => res.data!.deleteArtifact));
  }

  // createUser
  createUser(name: string): Observable<Person> {
    return this.apollo
      .mutate<{ createUser: Person }>({
        mutation: gql`
          mutation ($name: String!) {
            createUser(name: $name) {
              id
              name
              age
              sex
              address {
                id
                street
                city
                state
                zipCode
              }
            }
          }
        `,
        variables: { name },
      })
      .pipe(map((res) => res.data!.createUser));
  }

  // updateUser
  updateUser(id: string, name?: string): Observable<Person> {
    return this.apollo
      .mutate<{ updateUser: Person }>({
        mutation: gql`
          mutation ($id: ID!, $name: String) {
            updateUser(id: $id, name: $name) {
              id
              name
              age
              sex
              address {
                id
                street
                city
                state
                zipCode
              }
            }
          }
        `,
        variables: { id, name },
      })
      .pipe(map((res) => res.data!.updateUser));
  }
}
