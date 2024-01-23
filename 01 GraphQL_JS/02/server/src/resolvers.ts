import DataLoader from "dataloader";

import { allBooks, imageUrl } from "./book";
import { allReviews } from "./review";

// A map of functions which return data for the schema
const resolvers = {
  Book: {
    // ratingCount: (book: { rating_count: number }) => book.rating_count,
    imageUrl: (book: { googleId: string }, { size }: { size: string }) => imageUrl(size, book.googleId),
    authors: (
      book: { id: string },
      _args: string[],
      context: { loaders: { [key: string]: DataLoader<unknown, unknown, unknown> } }
    ) => {
      const { loaders } = context;
      const { findAuthorsByBookIdsLoader } = loaders;
      return findAuthorsByBookIdsLoader.load(book.id);
    },
  },
  Review: {
    book: (
      review: { bookId: string },
      _args: string[],
      context: { loaders: { [key: string]: DataLoader<unknown, unknown, unknown> } }
    ) => {
      const { loaders } = context;
      const { findBooksByIdsLoader } = loaders;
      // findBookById(review.bookId)
      return findBooksByIdsLoader.load(review.bookId);
    },
    user: (
      review: { userId: string },
      _args: string[],
      context: { loaders: { [key: string]: DataLoader<unknown, unknown, unknown> } }
    ) => {
      const { loaders } = context;
      const { findUsersByIdsLoader } = loaders;
      return findUsersByIdsLoader.load(review.userId);
    },
  },
  Query: {
    books: (_root: object, args: { [key: string]: string }) => {
      return allBooks(args);
    },
    reviews: (_root: object, args: { [key: string]: string }) => {
      return allReviews(args);
    },
  },
};

export default resolvers;
