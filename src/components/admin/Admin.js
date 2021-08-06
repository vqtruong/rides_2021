import React, { useState, useEffect } from "react";
import _ from "lodash";
import CarList from "../car/CarList";
import Sidebar from "./Sidebar";
import DefaultModal from "./DefaultModal";
import ConfirmDriverModal from "./ConfirmDriverModal";
import AddUserModal from "./AddUserModal";
import UserProfileModal from "./UserProfileModal";
import Car from "./Car";
import User from "./User";
import { getAllUsers } from "../../api/UserServices";
import { updateCars } from "../../api/CarServices";
import { autogenerate } from "../../Functions";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import buttonStyle from "./AwesomeButtonStyles.css";
import "./styles.css";

export default function Admin ({ text }) {
    const [draggedItem, setDraggedItem] = useState(0);
    const [cars, setCars] = useState([]);
    const [users, setUsers] = useState([]);
    
    const [timeOptions, setTimeOptions] = useState(["8:00AM", "13:00AM", "15:00AM"]);
    const [locations, setLocations] = useState(["EVK", "Village", "Ellendale"]);

    useEffect(() => {
        document.title = "Manage Rides";

        // getAllUsers().then((rsp) => {
        //     setUsers(rsp);
        // });
        let fakeUser0 = {
            name: "Matthew Matsumoto",
            email: "Matthew Email",
            phone: "Matthew Phone",
            pickupLocation: "EVK",
            canDrive: false,
            id: 0,
        }

        let fakeUser1 = {
            name: "Sarah Okamoto",
            email: "Sarah Email",
            phone: "Sarah Phone",
            pickupLocation: "Village",
            canDrive: true,
            id: 1
        }

        let fakeUser2 = {
            name: "Christopher Ahn",
            email: "Christopher Email",
            phone: "Christopher Phone",
            pickupLocation: "Ellendale",
            canDrive: false,
            id: 2
        }

        let rsp = [new User(fakeUser0), new User(fakeUser1), new User(fakeUser2)];
        setUsers(rsp);

        // TO DO: PULL PICKUP TIMES, PULL PICKUP LOCATIONS
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


    // CONFIRM DRIVER MODAL UTILITIES
    const [showConfirmDriver, setShowConfirmDriver] = useState(false);
    const [confirmDriverText, setConfirmDriverText] = useState("");
    const [confirmModalIndex, setConfirmModalIndex] = useState(null);

    const handleShowConfirmDriver = () => setShowConfirmDriver(true);
    function showConfirmDriverModal(user, index) {
        handleShowConfirmDriver();
        setConfirmModalIndex(index);
        setConfirmDriverText(user.name + " ");
    }
    
    
    // DEFAULT MODAL UTILITIES
    const [showDefaults, setShowDefaults] = useState(false);
    const handleCloseDefaults = () => setShowDefaults(false);
    const handleOpenDefaults = () => setShowDefaults(true);

    function showDefaultModal() {
        handleOpenDefaults();
    }

    // ADD TEMPORARY USER MODAL UTILITES
    const [showAddUser, setShowAddUser] = useState(false);

    function showAddUserModal() {
        setShowAddUser(true);
    }

    // USER PROFILE MODAL UTILITIES
    const [showUserProfile, setShowUserProfile] = useState(false);

    let fakeUser = {
        name: "",
        email: "Fake Email",
        phone: "Fake Phone",
        pickupLocation: "Ellendale",
        canDrive: false,
        id: -1
    }
    const [userProfile, setUserProfile] = useState(fakeUser);


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
            <ConfirmDriverModal showConfirmDriver={showConfirmDriver}
                                setShowConfirmDriver={setShowConfirmDriver}
                                dropDriver={dropDriver}
                                confirmDriverText={confirmDriverText}
                                setConfirmDriverText={setConfirmDriverText}
                                confirmModalIndex={confirmModalIndex}
                                />

            <DefaultModal   showDefaults={showDefaults} 
                            setShowDefaults={setShowDefaults}
                            handleCloseDefaults={handleCloseDefaults}
                            timeOptions={timeOptions}
                            setTimeOptions={setTimeOptions}
                            locations={locations}
                            setLocations={setLocations}/>

            
            <AddUserModal showAddUser={showAddUser}
                            setShowAddUser={setShowAddUser}
                            users={users}
                            setUsers={setUsers}
                            locations={locations}/>

            <UserProfileModal showUserProfile={showUserProfile}
                                setShowUserProfile={setShowUserProfile}
                                users={users}
                                setUsers={setUsers}
                                user={userProfile}
                                locations={locations}/>

            
            <div id="main">
                <Sidebar users={users} 
                            setDraggedItem={setDraggedItem} 
                            setUsers={setUsers} 
                            showAddUserModal={showAddUserModal}
                            setShowUserProfile={setShowUserProfile}
                            setUserProfile={setUserProfile}/>

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

                        <AwesomeButton type="secondary" className="special-btn" style={buttonStyle} onPress={showDefaultModal}>
                            <i className="material-icons default-icon">settings</i>Defaults 
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
                                showModal={showConfirmDriverModal} 
                                dropDriver={dropDriver}
                                timeOptions={timeOptions}/>
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


