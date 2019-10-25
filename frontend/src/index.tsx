import * as React from "react";
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-components';
const httpLink = createHttpLink({
    uri: 'http://localhost:3000'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
});

