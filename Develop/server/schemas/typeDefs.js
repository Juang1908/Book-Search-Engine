// Import the 'gql' function from the 'apollo-server-express' package.
const { gql } = require("apollo-server-express");

// Define a GraphQL schema using the 'gql' template literal tag.
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    me: User
  }
  // Define the 'Mutation' type with four fields, 'addUser', 'login', 'saveBook', and 'removeBook'.
  
  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    saveBook(
      bookId: String
      authors: [String]
      description: String
      title: String
      image: String
      link: String
    ): User
    removeBook(bookId: String): User
  }
`;

// Export the 'typeDefs' variable, which contains the GraphQL schema defined above.
module.exports = typeDefs;