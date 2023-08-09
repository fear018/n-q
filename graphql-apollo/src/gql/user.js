const gql = require("graphql-tag");

const { createUser, loginUser, getAllUsers } = require("../controllers/user");

exports.resolvers = {
  Mutation: {
    createUser: createUser,
    loginUser: loginUser,
  },

  Query: {
    getAllUsers: getAllUsers,
  },
};

exports.schema = gql`
  type Token {
    access: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    hash: String!
  }

  type Query {
    getAllUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Token
  }
`;
