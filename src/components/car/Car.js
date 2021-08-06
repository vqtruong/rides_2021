import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./styles.css";

export default function Car ({ cars, setCars, index, draggedItem, deleteCar, assign, deassign, users, showModal, dropDriver, viewOnly, timeOptions }) {
    
    let car = cars[index];
    const [over, setOver] = useState(false);
    const [pickupTime, setPickupTime] = useState([]);

    function removeDriver() {
        if (car.driver.id === null) {
            return;
        }

        // Make a copy of the cars, except change this car so that the driver is removed
        let newCars = cars.map((car, j) => {
            if (index === j) {
                let newCar = _.cloneDeep(car);
                newCar.driver.reset();
                return newCar;
            }
            return car;
        });
        deassign(cars[index].driver);
        setCars(newCars);
    }

    function handleDriverDrop(e) {
        if (car.driver.name !== "None") {
            return;
        }

        if (!draggedItem.canDrive) {
            showModal(draggedItem, index);
            return;
        }
        dropDriver(index);
    }

    function handleDriverOnDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDriverDragLeave(e) {
        setOver(false);
    }

    function handleDeleteCar(index) {        
        deassign(car.passengers, true);
        removeDriver();
        deleteCar(index);
    }

    // MAY NOT BE RIGHT
    function handleTableChange(input) {
        setPickupTime(input.target.value);
        let newCars = cars.map((car, j) => {
            if (index === j) {
                let newCar = _.cloneDeep(car);
                newCar.pickupTime = input.target.value;
                return newCar;
            }
            return car;
        })
        setCars(newCars);
    }

    useEffect(() => {
        car = cars[index];
        setPickupTime(timeOptions[0]);    
    }, [index]);


    return (
        <div className="car" > 
            <div className={over ? "carHeader over" : "carHeader"} >
                <div className="pickupLocation"> {car.getPickupLocations()} </div>
                <div className="pickupTime">
                    {viewOnly 
                        ? 
                            <>{car.pickupTime}</>
                        : 
                            <select className="select pickupTime" onChange={handleTableChange} value={pickupTime}>
                                { timeOptions.map((time) => {
                                    return <option className="select-option">{time}</option>
                                })}                                
                            </select>
                    }
                </div>

                <div className="relative">
                    <div className="driverDetails">
                        <h3 className="driverName"> {car.driver.name} </h3>
                        <h4 className="driverPhone">{car.driver.phone}</h4>
                    </div>

                    <div className={`hoverbox ${viewOnly ? "view-only" : ""}`}
                        onClick={removeDriver}
                        onDrop={handleDriverDrop} 
                        onDragOver={handleDriverOnDragOver} 
                        onDragLeave={handleDriverDragLeave}
                        onDragExit={handleDriverDragLeave}>

                    </div>
                </div>
            </div>

                
            
            <div className="passengers">
                { car.passengers.map((passenger, passengerIndex) => {
                    return <Passenger 
                                key={passengerIndex}
                                passenger={passenger} 
                                draggedItem={draggedItem} 
                                cars={cars} 
                                setCars={setCars} 
                                passengerIndex={passengerIndex}
                                carIndex={index}
                                assign={assign}
                                deassign={deassign}
                                viewOnly={viewOnly}
                            />
                })}
            </div>

            <button className={`btn delete-button ${viewOnly ? "view-only" : ""}`} onClick={() => { handleDeleteCar(index) }}> Delete </button>
        </div>
    )
}

function Passenger ({ passenger, draggedItem, cars, setCars, passengerIndex, carIndex, assign, deassign, viewOnly }) {
    function handlePassengerDrop(e) {
        if (passenger.assigned === true) {
            return;
        }

        let newCars = cars.map((car, i) => {
            if (i === carIndex) {
                cars[i].passengers[passengerIndex] = draggedItem;
                cars[i].addPickupLocations(draggedItem.pickupLocation);
            }
            return car;
        })
        setCars(newCars);
        assign(draggedItem);
        e.preventDefault();
        e.stopPropagation();
    }

    function handlePassengerOnDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handlePassengerDragLeave(e) {
    }

    function handleRemovePassenger() {
        let newCars = cars.map((car, j) => {
            if (carIndex === j) {
                let newCar = _.cloneDeep(car);
                newCar.removePassenger(passengerIndex);
                return newCar;
            }
            return car;
        })
        setCars(newCars);
        deassign(passenger);
    }

    return (
        <div className="relative">
            <div className="passengerEntry" 
                    onDrop={handlePassengerDrop} 
                    onDragOver={handlePassengerOnDragOver} 
                    onDragLeave={handlePassengerDragLeave}
                    onDragExit={handlePassengerDragLeave}>
                <div className="passengerEntryContents">
                    <div className="passengerName">{passenger.name}</div>
                    <div className="passengerPhone">{passenger.phone}</div>
                </div>

                <div className={`passengerEntryActions ${viewOnly ? "view-only" : ""}`} onClick={handleRemovePassenger}>
                    <i className="material-icons remove-icon">close</i>
                </div>
            </div>
        </div>
        
    )
}