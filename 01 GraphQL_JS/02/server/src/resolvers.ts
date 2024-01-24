import DataLoader from "dataloader";
import gravatar from "gravatar";

import { allBooks, imageUrl, searchBook } from "./book";
import { allReviews, createReview } from "./review";

// A map of functions which return data for the schema
const resolvers = {
  User: {
    imageUrl: (user: { email: string }, args: { size: number }) => gravatar.url(user.email, { s: String(args.size) }),
  },
  SearchBookResult: {
    imageUrl: (result: { id: string }, args: { size: string }) => imageUrl(args.size, result.id),
  },
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
    reviews: (
      book: { id: string },
      _args: string[],
      context: { loaders: { [key: string]: DataLoader<unknown, unknown, unknown> } }
    ) => {
      const { loaders } = context;
      const { findReviewsByBookIdsLoader } = loaders;
      return findReviewsByBookIdsLoader.load(book.id);
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
    book: (
      _root: object,
      args: { id: string },
      context: { loaders: { [key: string]: DataLoader<unknown, unknown, unknown> } }
    ) => {
      const { loaders } = context;
      const { findBooksByIdsLoader } = loaders;
      return findBooksByIdsLoader.load(args.id);
    },
    searchBook: (_root: object, args: { query: string }) => {
      const { query } = args;
      return searchBook(query);
    },
    // search: (_root: object, args: { query: string; }) => {
    //   const { query } = args;
    //   return search(query);
    // }
  },
  Mutation: {
    createReview: (_root: object, args: { reviewInput: object }) => {
      const { reviewInput } = args;
      return createReview(reviewInput as any);
    },
    // createBook: (_root:object, args: { googleBookId: object; }) => {
    //   const { googleBookId } = args;
    //   return createBook(googleBookId);
    // }
  },
};

export default resolvers;
