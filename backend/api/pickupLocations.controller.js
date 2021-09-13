import PickupLocationsDAO from "../dao/pickupLocationsDAO.js";

export default class PickupLocationsCtrl {
    static async apiGetPickupLocations(req, res, next) {
        const { pickupLocationsList } = await PickupLocationsDAO.getPickupLocations();

        let response = {
            pickupLocationsList : pickupLocationsList,
        }
        res.json(response);
    }

    static async apiPostPickupLocations(req, res, next) {
        try {
            const { name, order } = req.body;
            const pickupLocationInfo = {
                name: name,
                order: order
            }            

            const postResponse = await PickupLocationsDAO.addPickupLocations(pickupLocationInfo);
            res.json({status: "Success!", _id: postResponse.insertedId});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeletePickupLocations(req, res, next) {
        try {
            const ID = req.body.ID;
            await PickupLocationsDAO.deletePickupLocations(ID);
            res.json({ status: "Success!" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}