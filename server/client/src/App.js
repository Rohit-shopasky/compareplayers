import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Players from './components/Players';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-client";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

const httpLink = new HttpLink({
  uri: 'http://localhost:4524/'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4524/`,
  options: {
    reconnect: true
  }
});

const link = split(
 
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
    <div>    
   <Route exact path="/" component={()=><Players client ={client}/>} />

 
    </div>
 
  </Router>
  );
}

export default App;
