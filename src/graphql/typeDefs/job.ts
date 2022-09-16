import { gql } from "apollo-server";

export const jobs = gql`
  input ListerInput {
    username: String!
    imageUrl: String!
  }
  type ListerOutput {
    username: String!
    imageUrl: String!
  }
  type Job {
    address: String!
    suburb: String!
    postcode: Int!
    content: String!
    type: String
    salary: String
    lister: ListerOutput
    message: String!
    code: Int!
    tilte: String!
    createdAt: String
  }
  type AllJobs {
    code: Int!
    message: String!
    data: [Job]!
  }
  type Query {
    getJobs: AllJobs!
  }
  type Mutation {
    createJob(
      address: String!
      suburb: String!
      postcode: Int!
      content: String!
      type: String
      salary: String
      lister: ListerInput
      tilte: String!
    ): Job!
  }
`;
