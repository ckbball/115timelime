exports.resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello world5!'
    }, // note this comma
    bye: (root, args, context) => {
      return 'bye!'
    }
  }
  
}