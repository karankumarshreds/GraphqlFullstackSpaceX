const { gql } = require('apollo-server');

/**
 * An exclamation point (!) after a declared field's 
 * type means "this field's value can never be null."
 */

const typeDefs = gql`
    # Query types (for clients to fetch the data)
    type Query {     
        launches(
            # The number of results to show. Must be >= 1. Default = 20
            pageSize: Int, 
            # If you add a cursor here, it will only return results _after_ this cursor
            after: String
        ): LaunchConnection!
        launch(id: ID!): Launch
        me: User 
    }
    # Object types 
    type LaunchConnection {
        # indicates current position in the data set 
        cursor: String!
        # indictes whether the data set contains any more items
        # beyond those already included in the launcheds array 
        hasMore: Boolean!
        # a list of launches
        launches: [Launch]!
    }
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
    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }
    # Mutation type (for clients to mutate the data)
    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String # login token
    }
    ## It's good practice for a mutation to return whatever objects 
    ## it modifies so the requesting client can update its cache and 
    ## UI without needing to make a followup query.
`;

module.exports = typeDefs;