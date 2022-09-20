import { gql } from "apollo-server";

export const jobs = gql`
  type Job {
    address: String!
    suburb: String!
    postcode: Int!
    content: String!
    type: String
    salary: String
    company: String
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
      company: String
      tilte: String!
    ): Job!
  }
`;
