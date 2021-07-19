import React, { useState, useEffect } from "react";
import _ from "lodash";
import CarList from "../car/CarList";
import Sidebar from "./Sidebar";
import Car from "./Car";
import User from "./User";
import { getAllUsers } from "../../api/UserServices";
import { updateCars } from "../../api/CarServices";
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { autogenerate } from "../../Functions";
import 'react-toastify/dist/ReactToastify.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import "./styles.css";
import buttonStyle from "./AwesomeButtonStyles.css";

export default function Admin ({ text }) {
    const [draggedItem, setDraggedItem] = useState(0);
    const [cars, setCars] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalDisplay, setModalDisplay] = useState("");

    useEffect(() => {
        document.title = "Manage Rides";

        // getAllUsers().then((rsp) => {
        //     setUsers(rsp);
        // });
        let fakeUser = {
            name: "Matthew Matsumoto",
            email: "Fake Email",
            phone: "Fake Phone",
            pickupLocation: "EVK",
            canDrive: false,
            id: 0,
        }

        let fakeUser1 = {
            name: "Sarah Okamoto",
            email: "Fake Email",
            phone: "Fake Phone",
            pickupLocation: "Village",
            canDrive: true,
            id: 1
        }

        let fakeUser2 = {
            name: "Christopher Ahn",
            email: "Fake Email",
            phone: "Fake Phone",
            pickupLocation: "Ellendale",
            canDrive: false.valueOf,
            id: 2
        }

        let rsp = [new User(fakeUser), new User(fakeUser1), new User(fakeUser2)];
        setUsers(rsp);
    }, []);

    function addCar() {
        const emptyJSON = {
            "id": null,
            "name": "None",
            "phone": "-",
            "pickupLocation": null,
            "assigned": false,
            "canDrive": false,
        }

        const emptyUser = new User(emptyJSON);
        const emptyCar = [emptyUser, emptyUser, emptyUser, emptyUser];
        setCars(cars.concat(new Car(cars.length, [], "Time", emptyJSON, emptyCar)));
    }

    function resetCars() {
        setCars([]);
        let newUsers = users.map((user) => {
            let newUser = _.cloneDeep(user);
            newUser.assigned = false;
            return newUser;
        });
        setUsers(newUsers);
    }

    function submitCars() {
        updateCars(cars).then((rsp) => {
            toast('Cars have been updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        });
    }

    function handleAutogenerate() {
        autogenerate(users, setCars, assign);
    }

    // Called When: Admin drags user into a car.
    function assign(assignedUser) {
        // Look through the list of users and assign the corresponding user
        let newUsers = users.map((user) => {
            if (user === assignedUser) {
                user.assigned = true;
                return user;
            }
            return user;
        });
        setUsers(newUsers);
    }

    // Called When: Admin removes driver or passenger from a car.
    // Parameters:
    //  - multiple: used when deleting a 
    function deassign(assigned, multiple=false) {
        if (!multiple) {
            if (assigned.id === null) {
                return;
            }

            let newUsers = users.map((user, index) => {
                if (user.id === assigned.id) {
                    let newUser = _.cloneDeep(user);
                    newUser.assigned = false;
                    return newUser;
                }
                return user;
            });
            setUsers(newUsers);
        }

        else {
            let newUsers = users.map((user) => {
                // console.log(user);
                const found = assigned.find(p => p.id === user.id);
                if (found !== undefined) {
                    let newUser = _.cloneDeep(user);
                    newUser.assigned = false;
                    return newUser;
                }
                return user;
            })
            setUsers(newUsers);
        }
    }

    const [show, setShow] = useState(false);
    const [confirmModalIndex, setConfirmModalIndex] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function showModal(user, index) {
        handleShow();
        setConfirmModalIndex(index);
        setModalDisplay(user.name + " ");
    }
    
    function handleModalConfirm() {
        dropDriver(confirmModalIndex);
        handleClose();
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />

            {/* If the user assigns a user that is not a driver, pop up a warning modal. */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> </Modal.Title>
                </Modal.Header>
                <Modal.Body><strong>{modalDisplay} </strong>says that they are not a driver. Are you sure you want to make them drive? </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleModalConfirm}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>


            <div id="main">
                <Sidebar users={users} setDraggedItem={setDraggedItem} setUsers={setUsers}/>
                <div className="adminEdit">
                    <div className="buttonRow">
                        <AwesomeButton type="secondary" className="special-btn" style={buttonStyle} onPress={addCar}>
                            <i className="material-icons">add</i>Add Car
                        </AwesomeButton>
                        <AwesomeButton type="secondary" className="special-btn" style={buttonStyle} onPress={resetCars}>
                            <i className="material-icons">refresh</i>Reset 
                        </AwesomeButton>
                        <AwesomeButton type="secondary" className="special-btn" style={buttonStyle} onPress={handleAutogenerate}>
                        <i className="material-icons">bolt</i>Autogenerate 
                        </AwesomeButton>
                        <AwesomeButton type="primary" className="special-btn" style={buttonStyle} onPress={submitCars}>
                            Submit Cars
                        </AwesomeButton>
                    </div>
                    <CarList cars={cars} 
                                setCars={setCars} 
                                draggedItem={draggedItem} 
                                assign={assign} 
                                deassign={deassign} 
                                users={users} 
                                showModal={showModal} 
                                dropDriver={dropDriver}/>
                </div>
            </div>
                
        </>
    )

    function dropDriver(index) {
        // Update corresponding car
        let newCars = cars.map((car, j) => {
            if (index === j) {
                let newCar = _.cloneDeep(car);
                newCar.driver = draggedItem;
                newCar.driver.assigned = true;
                return newCar;
            }
            return car;
        })
        setCars(newCars);
        assign(draggedItem);
    }
}


