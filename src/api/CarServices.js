import Car from "../components/admin/Car";
import User from "../components/admin/User";
import { getUserByID } from "./UserServices";
import http from "./http-common.js";

// To update the car, delete all the cars and add the new ones
export async function updateCars(cars) {
    await deleteAllCars();
    await addCars(cars);
}

// TODO: Delete all at once through backend and not individually
export async function deleteAllCars() {
    let allCars = await getAllCars();
    Promise.all(allCars).then((rsp) => {
        rsp.forEach((car) => {
            deleteCarByID(car.ID);
        })
    })
}

export async function getAllCars() {
    return http.get(`cars/`).then((rsp) => {
        const carsList =  rsp.data.carsList;
        const newCars = carsList.map(async (car) => {
            const user = await getUserByID(car.driver_id);
            
            let driver;
            if (car.driver_id != null && user.data.usersList.length > 0) {
                console.log("found")
                driver = new User(user.data.usersList[0]);
            } 
            else {
                const emptyJSON = {
                    "ID": null,
                    "name": "None",
                    "phone": " - ",
                    "pickupLocation": null,
                    "assigned": false,
                    "canDrive": false,
                }
                driver = new User(emptyJSON);
                console.log("driver found");
            }

            const actualPassengers = car.passengers.map((p) => {
                return new User(p);
            });
            return new Car(car._id, car.pickupLocations, car.pickupTime, driver, actualPassengers);
        })
        return newCars;
    });
}

export function deleteCarByID(id) {
    return http.delete(`cars/`, {data: {ID: id}});
}

export function addCars(cars) {
    cars.forEach((car) => {
        addCar(car);
    })
}

export async function addCar(car) {
    let data = {
        pickupLocations: car.pickupLocations,
        pickupTime: car.pickupTime,
        driver_id: car.driver.ID,
        passengers: car.passengers,
        capacity: car.capacity,
    }
    return http.post(`cars/`, data);
}


