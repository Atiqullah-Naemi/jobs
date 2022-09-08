import { users } from "./user";
import { properties } from "./properties";

export const resolvers = {
  Query: {
    ...users.Query,
    ...properties.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...properties.Mutation,
  },
};
