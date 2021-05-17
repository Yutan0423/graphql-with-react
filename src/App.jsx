import React, { useState } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import Client from './Client';
import { SEARCH_REPOSITORIES } from './graphql';

const DEFAULT_VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  value: 'フロントエンドエンジニア',
};

const App = () => {
  const { value, first, last, before, after } = DEFAULT_VARIABLES;
  const [query, setQuery] = useState(value);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <ApolloProvider client={Client}>
        <form action="">
          <input type="text" value={query} onChange={handleChange} />
        </form>
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
