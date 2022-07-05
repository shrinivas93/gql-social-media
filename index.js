const { ApolloServer, gql } = require("apollo-server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { readFileSync } = require("fs");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "users", url: "https://gql-users-service.herokuapp.com/graphql" },
      { name: "posts", url: "https://gql-posts-service.herokuapp.com/graphql" },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
  introspection: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
