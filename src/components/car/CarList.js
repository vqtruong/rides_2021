import React from "react";
import Car from "./Car";
import User from "../admin/User"
import "./styles.css";

export default function CarList ({ cars, setCars, draggedItem, assign, deassign, users, showModal, dropDriver, viewOnly }) {
    function deleteCar(index) {
        let newCars = cars.filter((car, i) => {
            return index !== i;
        })
        setCars(newCars);
    }

    return (
        <div className="carList">
            { cars.map((car, index) => {
                return <Car 
                            key={index}
                            index={index} 
                            cars={cars} 
                            setCars={setCars} 
                            draggedItem={draggedItem} 
                            deleteCar={deleteCar}
                            assign={assign}
                            deassign={deassign}
                            users={users}
                            showModal={showModal}
                            dropDriver={dropDriver}
                            viewOnly={viewOnly}
                        />
            })}
        </div>
    )
}