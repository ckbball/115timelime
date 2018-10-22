const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  type Query {
    hello: String
    bye: String
    allUsers: [User!]!
    allPosts: [Post!]!
    user: User

  }
  type RootQuery {
    user(id: String): User
  }
  
  type User {
  	id: String!
  	user_email: String
    email: String
    Post: [Post!]!

  }

  type Post {
  	id: ID!
  	user: User
  	content: String!
  }



  
`;


  // type User {
  // 	id: ID!
  // 	name: String!
  // 	Posts: [Post]!
  // }