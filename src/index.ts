import "reflect-metadata";
import * as express from "express"
import { ApolloServer } from 'apollo-server-express';
import { AppDataSource } from "./data-source"
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { MovieResolver } from "./resolvers/MovieResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

(async () => {
  await AppDataSource.initialize()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, MovieResolver],
      emitSchemaFile: true,
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start()

  const app = express()
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4400, () => {
    console.log(`🚀 Server ready and listening at ==> http://localhost:4400${apolloServer.graphqlPath}`);
  });
})();
