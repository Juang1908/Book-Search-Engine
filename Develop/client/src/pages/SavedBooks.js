// This code imports necessary libraries and functions
import React from 'react';
import {
  Container,
  Card,
  Button,
  Jumbotron,
  CardColumns,
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

// This function defines the SavedBooks component
const SavedBooks = () => {
  // This hook retrieves user data from the serve
  const {loading, data} = useQuery(GET_ME);
  let userData= data?.me || {};
  // This hook sets up the removeBook mutation
  const [removeBook]= useMutation(REMOVE_BOOK);
  
  const handleDeleteBook = async (bookId) => {
    // Check for a valid token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeBook({ variables: { bookId } });

      if (!data) {
        throw new Error('something went wrong!');
      }
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      {/* Display a Jumbotron with a header */}
      <Jumbotron fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            // If there are no saved books, display a message
            : 'You have no saved books!'}
        </h2>
        {/* Display a card column for each saved book */}
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {/* Display the book cover image if it exists */}
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  {/* Display the book title */}
                  <Card.Title>{book.title}</Card.Title>
                  {/* Display the book authors */}
                  <p className='small'>Authors: {book.authors}</p>
                  {/* Display the book description */}
                  <Card.Text>{book.description}</Card.Text>
                  {/* Display a button to delete the book */}
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

// Export the SavedBooks component
export default SavedBooks;
