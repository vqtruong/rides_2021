import CarsDAO from "../dao/carsDAO.js";

export default class CarsCtrl {
    static async apiGetCars(req, res, next) {
        const { carsList } = await CarsDAO.getCars();
        let response = {
            carsList : carsList,
        }
        res.json(response);
    }

    static async apiPostCar(req, res, next) {
        try {
            const { pickupLocations, pickupTime, driver_id, passengers, capacity } = req.body;
            const carInfo = {
                pickupLocations: pickupLocations,
                pickupTime: pickupTime,
                driver_id: driver_id,
                passengers: passengers,
                capacity: capacity
            }
            
            const carResponse = await CarsDAO.addCar(carInfo);
            res.json({status: "Success!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateCar(req, res, next) {
        try {
            const { ID, pickupLocations, pickupTime, driver_id, passengers, capacity } = req.body;

            const carInfo = {
                ID: ID,
                pickupLocations: pickupLocations,
                pickupTime: pickupTime,
                driver_id: driver_id,
                passengers: passengers,
                capacity: capacity
            }

            const carResponse = await CarsDAO.updateCar(carInfo);

            let { error } = carResponse;
            if (error) {
                res.status(400).json({error});
            }
            if (carResponse.modifiedCount === 0) {
                throw new Error("Unable to update car. Potentially invalid ID.");
            }
            res.json({ status: "Success!" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteCar(req, res, next) {
        try {
            const carID = req.body.ID;
            await CarsDAO.deleteCar(carID);
            res.json({ status: "Success!" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}