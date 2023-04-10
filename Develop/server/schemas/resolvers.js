const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// Define resolvers
const resolvers = {
    Query: {
      // Resolver for the 'me' query
      me: async (parent, args, context) => {
        // Check if user is authenticated
        if (context.user) {
          // Find and return user details
          const results = User.findOne({ _id: context.user._id });
          return results;
        }
        // Throw authentication error if not authenticated
        throw new AuthenticationError("You need to be logged in!");
      },
    },

    Mutation: {
        // Resolver for the 'addUser' mutation
        addUser: async (parent, { username, email, password }) => {
          // Create a new user
          const user = await User.create({ username, email, password });
          // Generate a token for the user
          const token = signToken(user);
          // Return the token and user details
          return { token, user };
        },
        // Resolver for the 'login' mutation
        login: async (parent, { email, password }) => {
          // Find user by email
          const user = await User.findOne({ email });
    
          if (!user) {
            // Throw error if no user found with the given email
            throw new AuthenticationError("No user found with this email address");
          }
    
          // Verify password
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            // Throw error if password is incorrect
            throw new AuthenticationError("Incorrect credentials");
          }
    
          // Generate a token for the user
          const token = signToken(user);
    
          // Return the token and user details
          return { token, user };
        },
        // Resolver for the 'saveBook' mutation
        saveBook: async (parent, { bookId, authors, description, title, image, link },
          context) => {
          // Check if user is authenticated
          if (context.user) {
            // Update user's savedBooks array with new book details
            return User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedBooks: { bookId, authors, description, title, image, link },
            },
              },
              { new: true, runValidators: true }
            );
          } else {
            // Throw authentication error if not authenticated
            throw new AuthenticationError("You need to be logged in!");
          }
        },
        // Resolver for the 'removeBook' mutation
        removeBook: async (parent, { bookId }, context) => {
          // Check if user is authenticated
          if (context.user) {
            // Remove book from user's savedBooks array
            return User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId } } },
              { new: true, runValidators: true }
            );
          } else {
            // Throw authentication error if not authenticated
            throw new AuthenticationError("You need to be logged in!");
          }
        },
    },
};

// Export resolvers
module.exports = resolvers;
