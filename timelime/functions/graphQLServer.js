const { typeDefs } = require('./schema.js')
const { resolvers } = require('./resolvers.js')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')

exports.server = new ApolloServer({
	typeDefs,
	resolvers
})

