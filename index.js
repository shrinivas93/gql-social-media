const { ApolloServer, gql } = require("apollo-server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { readFileSync } = require("fs");
const { ApolloServerPluginLandingPageGraphQLPlayground } =require("apollo-server-core");

const gateway = new ApolloGateway({
  debug: true,
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "users", url: "https://gql-users-service.herokuapp.com/graphql" },
      { name: "posts", url: "https://gql-posts-service.herokuapp.com/graphql" },
      {
        name: "address",
        url: "https://gql-address-service.herokuapp.com/graphql",
      },
      // { name: "users", url: "http://localhost:8001/graphql" },
      // { name: "posts", url: "http://localhost:8002/graphql" },
      // { name: "address", url: "http://localhost:8003/graphql" },
    ],
    pollIntervalInMs: 5000,
  }),
  // supergraphSdl: readFileSync("./supergraph.graphqls", {
  //   encoding: "utf8",
  //   flag: "r",
  // }),
  __exposeQueryPlanExperimental: true,
});

const server = new ApolloServer({
  debug: true,
  gateway,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
