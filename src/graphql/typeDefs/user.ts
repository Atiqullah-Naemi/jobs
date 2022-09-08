import { gql } from "apollo-server";

export const users = gql`
  type User {
    username: String
    email: String!
    createdAt: String!
    token: String
    imageUrl: String!
    message: String!
    code: Int!
  }
  type Query {
    login(email: String!, password: String!): User!
  }
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
  }
`;
