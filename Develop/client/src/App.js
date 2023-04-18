// import necessary modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: "/graphql",
});

// set up the authorization link to include the token in the headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// create a new instance of the ApolloClient with the authorization link and in-memory cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// define the main App component
function App() {
  return (
    // wrap the component tree in the ApolloProvider and Router
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            {/* define the routes for different pages */}
            <Route path='/' element={<SearchBooks />}/>
            <Route path='/saved' element={<SavedBooks />}/>
            {/* fallback route for any other paths */}
            <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>}/>
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

// export the App component as the default export of this module
export default App;
