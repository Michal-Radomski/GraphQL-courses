import { allBooks, imageUrl } from "./book";

// A map of functions which return data for the schema
const resolvers = {
  Book: {
    // ratingCount: (book: { rating_count: number }) => book.rating_count,
    imageUrl: (book: { googleId: string }, { size }: { size: string }) => imageUrl(size, book.googleId),
    authors: (book: { id: string }, _args: string[], context: { loaders: any }) => {
      const { loaders } = context;
      const { findAuthorsByBookIdsLoader } = loaders;
      return findAuthorsByBookIdsLoader.load(book.id);
    },
  },
  Query: {
    books: () => {
      return allBooks();
    },
  },
};

export default resolvers;
