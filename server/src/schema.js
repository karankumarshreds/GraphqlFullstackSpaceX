const { gql } = require('apollo-server');

/**
 * An exclamation point (!) after a declared field's 
 * type means "this field's value can never be null."
 */

const typeDefs = gql`
    # Query types (for clients to fetch the data)
    type Query {
        launches: [Launch]!
        launch(id: ID!): Launch
        me: User 
    }
    # Object types 
    enum PatchSize {
        SMALL
        LARGE
    }  
    type Rocket {
        id: ID!
        name: String
        type: String 
    }
    type Mission {
        name: String 
        missionPatch(size: PatchSize): String
    }
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket 
        isBooked: Boolean!
    }
    type User {
        id: ID!
        email: String!
        trips: [Launch!] 
    }
    # Mutation type (for clients to mutate the data)
    Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String # login token
    }

`
module.exports = typeDefs;

