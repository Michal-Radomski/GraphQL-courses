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
      return findBooksByIdsLoader.load(review.bookId);
      // findBookById(review.bookId)
    },
  },
  Query: {
    books: () => {
      return allBooks();
    },
    reviews: () => allReviews(),
  },
};

export default resolvers;
