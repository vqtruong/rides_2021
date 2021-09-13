import PickupTimesDAO from "../dao/pickupTimesDAO.js";

export default class PickupTimesCtrl {
    static async apiGetPickupTimes(req, res, next) {
        const { pickupTimesList } = await PickupTimesDAO.getPickupTimes();

        let response = {
            pickupTimesList : pickupTimesList,
        }
        res.json(response);
    }

    static async apiPostPickupTimes(req, res, next) {
        try {
            const { name, order } = req.body;
            const pickupTimeInfo = {
                name: name,
                order: order
            }            

            const postResponse = await PickupTimesDAO.addPickupTimes(pickupTimeInfo);
            res.json({status: "Success!", _id: postResponse.insertedId});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeletePickupTimes(req, res, next) {
        try {
            const ID = req.body.ID;
            await PickupTimesDAO.deletePickupTimes(ID);
            res.json({ status: "Success!" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}