const resolvers = {
    Query: {
        launches: (parent, args, { dataSources }) => (
            dataSources.launchAPI.getAllLaunches()
        ),
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