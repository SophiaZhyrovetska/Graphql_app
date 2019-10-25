import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
	uri: "http://localhost:3000"
});

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: httpLink
});

export default client;
