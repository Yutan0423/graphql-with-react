import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Client from './Client';

const ME = gql`
  query me {
    user(login: "Yutan0423") {
      name
      avatarUrl
    }
  }
`;

const App = () => {
  return (
    <>
      <ApolloProvider client={Client}>
        <div>GraphQL</div>
        <Query query={ME}>
          {({ loading, error, data }) => {
            if (loading) return 'loading...';
            if (error) return `Error: ${error.message}`;

            return <div>{data.user.name}</div>;
          }}
        </Query>
      </ApolloProvider>
    </>
  );
};

export default App;
