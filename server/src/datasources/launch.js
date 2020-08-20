const { RESTDataSource } = require('apollo-datasource-rest');

// To connect third party api as data source to the apollo server 
class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/';
    }
    // custom methods to fetch data from the api
    async getAllLaunches() {
        const response = await this.get('launches');
        // if response is array format it as per our schema 
        return Array.isArray(response)
            ? response.map(launch => this.launchReducer(launch))
            : [];
    }
    // method that transforms launch data returned into a shape that our schema expects
    launchReducer(launch) {
        return {
            id: launch.flight_number || 0,
            cursor: `${launch.launch_date_unix}`,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name: launch.mission_name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch,
            },
            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type,
            },
        };
    }
    async getLauncheById({ launchId }) {
        const response = await this.get('launches', { flight_number: launchId })
        return this.launchReducer(response[0]);
    }
    getLaunchesById({ launchIds }) {
        return Promise.all(
            launchIds.map(launchId => this.getLauncheById({ launchId }))
        );
    }

}

module.exports = LaunchAPI;








/*******************************************************************
 * The RESTDataSource class automatically caches responses from REST
 * resources with no additional setup. We call this feature partial
 * query caching. It enables you to take advantage of the caching
 * logic that the REST API already exposes.
 *
 * The call to this.get('launches') sends a GET request to
 * https://api.spacexdata.com/v2/launches and stores the array of
 * returned launches in response.
 */