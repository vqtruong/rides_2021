import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

let cars;

export default class CarsDAO {
    // Called when initially connected to database (aka when server starts)
    static async injectDB(conn) {
        // If already connected, do nothing
        if (cars) {
            return;
        }

        try {
            cars = await conn.db(process.env.RIDES_NS).collection("cars");
        } catch (e) {
            console.error(`Unable to establish connection in carsDAO: ${e}`)
        }
    }

    static async getCars() {
        let query;

        let results;
        try {
            results = await cars.find(query);
        } catch (e) {
            console.error(`Unable to issue find command ${e}`);
            return { carsList: []};
        }

        try {
            const carsList = await results.toArray();
            return { carsList };
        } catch (e) {
            console.error(`Unable to convert to array: ${e} `);
            return { carsList: []};
        }
    }

    static async addCar({pickupLocations, pickupTime, driver_id, passengers, capacity}) {
        try {
            const newCar = {
                pickupLocations: pickupLocations,
                pickupTime: pickupTime,
                driver_id: driver_id,
                passengers: passengers,
                capacity: capacity
            }

            return await cars.insertOne(newCar);
        } catch (e) {
            console.error(`Unable to add car: ${e}`);
            return { error: e }
        }
    }

    static async updateCar(carInfo) {
        try {
            const { ID, pickupLocations, pickupTime, driver_id, passengers, capacity } = carInfo;
            const updateResponse = await cars.updateOne(
                { _id: ObjectID(ID) },
                { $set: { pickupLocations: pickupLocations, 
                            pickupTime: pickupTime, 
                            driver_id: driver_id, 
                            passengers: passengers, 
                            capacity: capacity }}
                
            )
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update car: ${e}`);
            return { error: e }
        }
    }

    static async deleteCar(carID) {
        try {
            const deleteResponse = await cars.deleteOne({
                _id: ObjectID(carID)
            })
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete car: ${e}`);
            return { error: e }
        }
    }
}