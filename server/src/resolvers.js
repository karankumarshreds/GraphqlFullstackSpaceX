const { paginateResults } = require('./utils');

const resolvers = {
    Query: {
        launches: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allLaunches = await dataSources.launchAPI.getAllLaunches();
            // we want these in reverse chronological order
            allLaunches.reverse();
            const launches = paginateResults({
                after,
                pageSize,
                results: allLaunches
            });
            return {
                launches,
                cursor: launches.length ? launches[launches.length - 1].cursor : null,
                // if the cursor at the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: launches.length
                    ? launches[launches.length - 1].cursor !==
                    allLaunches[allLaunches.length - 1].cursor
                    : false
            };
        },
        launch: (parent, args, { dataSources }) => (
            dataSources.launchAPI.getLaunchById({ launchId: id })
        ),
        me: (parent, args, { dataSources }) => (
            dataSources.userAPI.findOrCreateUser()
        )
    },
    Launch: {
        // returns boolean
        isBooked: async (parent, args, { dataSources }) => {
            dataSources.userAPI.isBookedOnLaunch({
                launchId: parent.id
            });
        }
    },
    User: {
        trips: async (parent, args, { dataSources }) => {
            // we need to pass in the id for the current user 
            const launchIds = await dataSources.userAPI.getLaunchByIdByUser();
            if (!launchIds.length) return [];
            // look up those launches by their ids 
            return (
                dataSources.launchAPI.getLaunchesByIds({
                    launchIds
                }) || []
            )
        }
    }
};

module.exports = resolvers;