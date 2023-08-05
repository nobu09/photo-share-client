import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql',
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
