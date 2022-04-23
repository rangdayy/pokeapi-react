import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    gql,
    useQuery
} from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.graphcdn.app/',
    cache: new InMemoryCache()
});

// export function ResponseGraphQL(loading, error, data) {

//     if (loading) return 'Loading...';
//     if (error) return `Error! ${error.message}`;

//     console.log('Response from server', data);
//     return (
//         <div>
//           <ul>
//             {data.pokemons.results.map(({name, url,imagey,id}) => (
//               <div id={id}>
//               <p>
//                 <img src={image}></img>{name}
//               </p>
//             </div>
//             ))}
//           </ul>
//         </div>
//       );
// };

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

