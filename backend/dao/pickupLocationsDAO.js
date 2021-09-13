import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

let pickupLocations;

export default class PickupLocationsDAO {
    // Called when initially connected to database (aka when server starts)
    static async injectDB(conn) {
        // If already connected, do nothing
        if (pickupLocations) {
            return;
        }

        try {
            pickupLocations = await conn.db(process.env.RIDES_NS).collection("pickupLocations");
        } catch (e) {
            console.error(`Unable to establish connection in pickupLocationsDAO: ${e}`)
        }
    }

    static async getPickupLocations() {
        let query;

        let results;
        try {
            results = await pickupLocations.find(query);
        } catch (e) {
            console.error(`Unable to issue find command ${e}`);
            return { pickupLocationsList: []};
        }

        try {
            const pickupLocationsList = await results.toArray();
            return { pickupLocationsList };
        } catch (e) {
            console.error(`Unable to convert to array: ${e} `);
            return { pickupLocationsList: []};
        }
    }

    static async addPickupLocations({name, order}) {
        try {
            return await pickupLocations.insertOne({name, order});
        } catch (e) {
            console.error(`Unable to add pickupLocation: ${e}`);
            return { error: e }
        }
    }

    static async deletePickupLocations(ID) {
        try {
            const deleteResponse = await pickupLocations.deleteOne({
                _id: ObjectID(ID)
            })
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete pickupLocations: ${e}`);
            return { error: e }
        }
    }
}