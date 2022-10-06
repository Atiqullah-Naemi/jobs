import { ApolloServer } from "apollo-server-express";
import express from "express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";
import { contextMiddleware } from "./utils/authMiddleware";

dotenv.config();

const PORT = 4000;

initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.BUCKET,
  messagingSenderId: process.env.MSGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASURMENTID,
});

async function startApolloServer(typeDefs: any, resolvers: any) {
  const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    context: contextMiddleware,
  });

  const app = express();
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);
