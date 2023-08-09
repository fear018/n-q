const { makeExecutableSchema } = require("@graphql-tools/schema");

const UserResolver = require("./user");

module.exports = makeExecutableSchema({
  typeDefs: [UserResolver.schema],
  resolvers: [UserResolver.resolvers],
});
