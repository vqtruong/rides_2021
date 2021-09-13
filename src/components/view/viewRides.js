import React, { useState, useEffect } from "react";
import CarList from "../car/CarList";
import { getAllCars } from "../../api/CarServices";

import "./styles.css";

export default function ViewRides () {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        document.title = "View Rides";
        getAllCars().then((rsp) => {
            Promise.all(rsp).then((result) => {
                setCars(result);
            })
        });
    }, [])

    return (
        <div id="main">
            <CarList cars={cars} setCars={setCars} viewOnly={true}/>
        </div>
    )
}