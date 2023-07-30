import React from 'react';
import User from './User';
import { gql } from 'apollo-boost';

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      githubLogin
      name
      avatar
    }
  }
`

const App = () => <User />;
export default App;
