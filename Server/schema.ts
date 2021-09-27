import { gql } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = gql`
  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }
  type Query {
    peopleByPage(page: String!): [Person]
    peopleBySearch(name: String!): [Person]
  }
`;

const resolvers = {
  Query: {
    peopleByPage(_: any, { page }: any, { dataSources }: any) {
      return dataSources.swapiApi.withPage(page);
    },
    peopleBySearch(_: any, { name }: any, { dataSources }: any) {
      return dataSources.swapiApi.withSearch(name);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
