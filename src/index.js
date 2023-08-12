import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache, gql, HttpLink, ApolloLink, split } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { persistCache } from 'apollo-cache-persist'

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: localStorage
});

// キャッシュデータの確認
console.log(`localStorage['apollo-cache-persist']: ${localStorage['apollo-cache-persist']}`);

// キャッシュがあれば、クライアント作成前にキャッシュデータでローカルのcacheを初期化しておく
if (localStorage['apollo-cache-persist']) {
  let cacheData = JSON.parse(localStorage['apollo-cache-persist']);
  cache.restore(cacheData);
}

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(context => ({
    headers: {
      ...context.headers,
      authorization: localStorage.getItem('token')
    }
  }));
  return forward(operation);
});

const httpAuthLink = authLink.concat(httpLink);
const wsLink = new WebSocketLink({ uri: 'ws://localhost:4000/graphql', options: { reconnect: true }});

const link = split(
  ({query}) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpAuthLink
)


const client = new ApolloClient({ 
  cache,
  link
})

const query = gql`
  {
    totalUsers
    totalPhotos
  }
`

// ローカルのメモリにキャッシュされたレスポンスを確認する(client.extract())
console.log('cache', client.extract())
client.query({query})
  .then(() => console.log('cache', client.extract()))
  .catch(console.error)

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
