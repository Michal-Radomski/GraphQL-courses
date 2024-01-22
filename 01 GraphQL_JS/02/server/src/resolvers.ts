import { allBooks } from "./book";

// A map of functions which return data for the schema
const resolvers = {
  Book: {
    // ratingCount: (book: { rating_count: number }) => book.rating_count,
  },
  Query: {
    books: () => {
      return allBooks();
    },
  },
};

export default resolvers;
