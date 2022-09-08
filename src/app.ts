import { ApolloServer } from "apollo-server-express";
import express from "express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { initializeApp } from "firebase/app";

const PORT = 4000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

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
    typeDefs,
    resolvers,
    context: (ctx) => {
      return ctx.req;
    },
  });
  const app = express();
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: corsOptions });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);
