import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
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

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: localStorage.getItem('token')
      }
    }))
  }
 });

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
