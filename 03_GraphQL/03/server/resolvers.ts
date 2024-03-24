import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { createMessage, getMessages } from "./db/messages";

const pubSub = new PubSub();

export const resolvers = {
  Query: {
    messages: (_root: any, _args: unknown[], { user }: { user: string }) => {
      if (!user) throw unauthorizedError();
      return getMessages();
    },
  },

  Mutation: {
    addMessage: async (_root: any, { text }: { text: string }, { user }: { user: string }) => {
      if (!user) throw unauthorizedError();
      const message = await createMessage(user, text);
      pubSub.publish("MESSAGE_ADDED", { messageAdded: message });
      return message;
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: (_root: any, _args: unknown[], { user }: { user: string }) => {
        if (!user) throw unauthorizedError();
        return pubSub.asyncIterator("MESSAGE_ADDED");
      },
    },
  },
};

function unauthorizedError() {
  return new GraphQLError("Not authenticated", {
    extensions: { code: "UNAUTHORIZED" },
  });
}
