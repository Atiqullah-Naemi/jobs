import { gql } from "apollo-server";

export const properties = gql`
  input ListerInput {
    username: String!
    imageUrl: String!
  }
  type ListerOutput {
    username: String!
    imageUrl: String!
  }
  type Property {
    address: String!
    suburb: String!
    postcode: Int!
    content: String!
    price: String
    bedrooms: String
    bathrooms: String
    carparks: String
    type: String
    landSize: String
    buildingSize: String
    imageUrl: String!
    lister: ListerOutput
    message: String!
    code: Int!
    createdAt: String
  }
  type AllProperties {
    code: Int!
    message: String!
    data: [Property]!
  }
  type Query {
    getProperties: AllProperties!
  }
  type Mutation {
    createProperty(
      address: String!
      suburb: String!
      postcode: Int!
      content: String!
      price: String!
      bedrooms: String!
      bathrooms: String!
      carparks: String!
      type: String!
      landSize: String!
      buildingSize: String!
      imageUrl: String
      lister: ListerInput!
    ): Property!
  }
`;
