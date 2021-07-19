import React, { useState, useEffect } from "react";
import CarList from "../car/CarList";
import { getAllCars } from "../../api/CarServices";

import "./styles.css";

export default function ViewRides () {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        document.title = "View Rides";
        getAllCars().then((rsp) => {
            setCars(rsp);
        })
    }, [])

    return (
        <div className="">
            <CarList cars={cars} setCars={setCars} viewOnly={true}/>
        </div>
    )
}