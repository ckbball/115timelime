const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  type Query {
    hello: String
    bye: String
  }



  
`;


