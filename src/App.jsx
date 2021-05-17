import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import Client from './Client';
import { SEARCH_REPOSITORIES } from './graphql';

const VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: 'フロントエンドエンジニア',
};

const App = () => {
  const { query, first, last, before, after } = VARIABLES;

  return (
    <>
      <ApolloProvider client={Client}>
        <Query
          query={SEARCH_REPOSITORIES}
          variables={{ query, first, last, before, after }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'loading...';
            if (error) return `Error: ${error.message}`;
            console.log(data);

            return <div></div>;
          }}
        </Query>
      </ApolloProvider>
    </>
  );
};

export default App;
