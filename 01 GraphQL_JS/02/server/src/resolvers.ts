import { allBooks } from "./book";

// A map of functions which return data for the schema
const resolvers = {
  Book: {},
  Query: {
    books: () => {
      return allBooks();
    },
  },
};

export default resolvers;
