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
            const search = data.search;
            const repositoryCount = search.repositoryCount;
            const repositoryUnit =
              repositoryCount === 1 ? 'repository' : 'repositories';
            const title = `Github Repositories Search Results - ${search.repositoryCount} ${repositoryUnit}`;
            return (
              <>
                <h2>{title}</h2>
                {console.log(search.edges)}
                <ul>
                  {search.edges.map((edge) => {
                    const node = edge.node;
                    return (
                      <li key={node.id}>
                        <a href={node.url} target="_blank">
                          {node.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          }}
        </Query>
      </ApolloProvider>
    </>
  );
};

export default App;
