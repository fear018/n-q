const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const schema = require("./src/gql/schema");

const app = express();
const httpServer = http.createServer(app);

const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (err) => {
      console.log(err);
      return err;
    },
    context: async ({ req, res }) => {
      // auth, context, etc
    },
  });

  await server.start();

  app.use(
    "/",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:3000/`);
};

startApolloServer();
