import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        url
        name
        image
      }
    }
  }
`;

export const GET_DETAIL = gql`
query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    message
    species{name}
    abilities{
      ability{name}
    }
    weight
    height
    moves{
      move{
        name
      }
    }
    types {
      type {
        name}
    }
    sprites {
      front_default
    }
  }
}
`;
