import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./components/App";
import { ApolloProvider } from "react-apollo";
import { HashRouter } from "react-router-dom";

const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null
});

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: cache,
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    }
});


const Root = () => {
  return (
    <ApolloProvider client={client}>
        <HashRouter>
            <App />
        </HashRouter>
    </ApolloProvider>
  )
};

ReactDOM.render(<Root />, document.querySelector("#root"));