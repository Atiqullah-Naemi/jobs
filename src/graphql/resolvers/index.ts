import { users } from "./user";
import { jobs } from "./jobs";

export const resolvers = {
  Query: {
    ...users.Query,
    ...jobs.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...jobs.Mutation,
  },
};
