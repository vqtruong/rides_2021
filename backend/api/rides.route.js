import express from "express";
import UsersCtrl from "./users.controller.js";
import CarsCtrl from "./cars.controller.js";
import PickupLocationsCtrl from "./pickupLocations.controller.js";
import PickupTimesCtrl from "./pickupTimes.controller.js";

const router = express.Router();

router
    .route("/users")
    .get(UsersCtrl.apiGetUsers)
    .post(UsersCtrl.apiPostUser)
    .put(UsersCtrl.apiUpdateUser)
    .delete(UsersCtrl.apiDeleteUser);

router
    .route("/cars")
    .get(CarsCtrl.apiGetCars)
    .post(CarsCtrl.apiPostCar)
    .put(CarsCtrl.apiUpdateCar)
    .delete(CarsCtrl.apiDeleteCar);

router
    .route("/pickupLocations")
    .get(PickupLocationsCtrl.apiGetPickupLocations)
    .post(PickupLocationsCtrl.apiPostPickupLocations)
    .delete(PickupLocationsCtrl.apiDeletePickupLocations)

router 
    .route("/pickupTimes")
    .get(PickupTimesCtrl.apiGetPickupTimes)
    .post(PickupTimesCtrl.apiPostPickupTimes)
    .delete(PickupTimesCtrl.apiDeletePickupTimes)

export default router;