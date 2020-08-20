// require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');


// Server setup
const server = new ApolloServer({ typeDefs });
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});




