import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

let pickupTimes;

export default class PickupTimesDAO {
    // Called when initially connected to database (aka when server starts)
    static async injectDB(conn) {
        // If already connected, do nothing
        if (pickupTimes) {
            return;
        }

        try {
            pickupTimes = await conn.db(process.env.RIDES_NS).collection("pickupTimes");
        } catch (e) {
            console.error(`Unable to establish connection in pickupTimesDAO: ${e}`)
        }
    }

    static async getPickupTimes() {

        let results;
        try {
            results = await pickupTimes.find().sort({ "order": 1 });
        } catch (e) {
            console.error(`Unable to issue find command ${e}`);
            return { pickupTimesList: []};
        }

        try {
            const pickupTimesList = await results.toArray();
            return { pickupTimesList };
        } catch (e) {
            console.error(`Unable to convert to array: ${e} `);
            return { pickupTimesList: []};
        }
    }

    static async addPickupTimes({name, order}) {
        try {
            return await pickupTimes.insertOne({name, order});
        } catch (e) {
            console.error(`Unable to add pickupTime: ${e}`);
            return { error: e }
        }
    }

    static async deletePickupTimes(ID) {
        try {
            const deleteResponse = await pickupTimes.deleteOne({
                _id: ObjectID(ID)
            })
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete pickupTimes: ${e}`);
            return { error: e }
        }
    }
}