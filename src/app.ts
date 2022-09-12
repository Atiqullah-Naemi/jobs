import { ApolloServer } from "apollo-server";
import express from "express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { initializeApp } from "firebase/app";

const PORT = 5001;

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
    introspection: true,
    typeDefs,
    resolvers,
    context: (ctx) => {
      return ctx.req;
    },
  });

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer(typeDefs, resolvers);
