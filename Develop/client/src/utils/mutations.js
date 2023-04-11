import { gql } from "@apollo/client";

// GraphQL mutation for logging in a user
export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token // JWT token for user authentication
      user { // User object with _id and username fields
        _id
        username
      }
    }
  }
`;

// GraphQL mutation for adding a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token // JWT token for user authentication
      user { // User object with _id and username fields
        _id
        username
      }
    }
  }
`;

// GraphQL mutation for saving a book to a user's profile
export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String
    $authors: [String]
    $description: String
    $title: String
    $image: String
    $link: String
  ) {
    saveBook(
      bookId: $bookId
      authors: $authors
      description: $description
      title: $title
      image: $image
      link: $link
    ) { // User object with _id, username, email, bookCount, and savedBooks fields
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) { // User object with _id, username, bookCount, and savedBooks fields
      _id
      username
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;