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
import { getAllUsers, updateUsers } from "../../api/UserServices";
import { getAllCars, updateCars } from "../../api/CarServices";
import { getAllTimes } from "../../api/TimeServices";
import { getAllLocations } from "../../api/LocationServices";
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
    
    const [timeOptions, setTimeOptions] = useState([]);
    const [locations, setLocations] = useState([]);

    const [fullyLoaded, setFullyLoaded] = useState(false);
    const [carsLoaded, setCarsLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [timesLoaded, setTimesLoaded] = useState(false);
    const [locationsLoaded, setLocationsLoaded] = useState(false);
    const [pickupLocation, setPickupLocation] = useState();

    useEffect(() => {
        document.title = "Manage Rides";

        getAllCars().then((rsp) => {
            Promise.all(rsp).then((result) => {
                setCars(result);

                setCarsLoaded(true);
                if (carsLoaded && usersLoaded && timesLoaded && locationsLoaded) handleFullyLoaded();
            });
        });

        getAllUsers().then((rsp) => {
            setUsers(rsp.map((u) => {
                return new User(u);
            }));  
            setUsersLoaded(true);
            if (carsLoaded && timesLoaded && locationsLoaded) handleFullyLoaded();
        });

        getAllTimes().then((rsp) => {
            setTimeOptions(rsp);
            setTimesLoaded(true);
            if (carsLoaded && usersLoaded && locationsLoaded) handleFullyLoaded();
        })

        getAllLocations().then((rsp) => {
            setLocations(rsp);
            if (rsp.length > 0) setPickupLocation(rsp[0].name);
            setLocationsLoaded(true);
            if (carsLoaded && usersLoaded && timesLoaded) handleFullyLoaded();
        });
    }, [carsLoaded, locationsLoaded, timesLoaded, usersLoaded]);

    function handleFullyLoaded() {
        setTimeout(() => {
            setFullyLoaded(true);
        }, 300)
    }

    function addCar() {
        let defaultTime;
        timeOptions && timeOptions.length > 0 ? defaultTime = timeOptions[0].name : defaultTime = null;

        const emptyJSON = {
            "ID": null,
            "name": "None",
            "phone": " - ",
            "pickupLocation": null,
            "assigned": false,
            "canDrive": false,
        }

        const emptyUser = new User(emptyJSON);
        const emptyCar = [emptyUser, emptyUser, emptyUser, emptyUser];
        setCars(cars.concat(new Car(cars.length, [], defaultTime, emptyJSON, emptyCar)));
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

    function submit() {
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

        updateUsers(users);
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
            if (assigned.ID === null) {
                return;
            }

            let newUsers = users.map((user, index) => {
                if (user.ID === assigned.ID) {
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
                const found = assigned.find(p => p.ID === user.ID);
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

    let defaultUser = {
        name: "",
        email: "",
        phone: "",
        pickupLocation: "",
        canDrive: false,
        ID: -1
    }
    const [userProfile, setUserProfile] = useState(defaultUser);

    function handleTest() {
        // console.log(cars);
        console.log(users);
        // console.log(locations);
    }


    return (
        <>
            { !fullyLoaded ? <div class="loader">Loading...</div>
                :<>
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
                                    locations={locations}
                                    pickupLocation={pickupLocation}
                                    setPickupLocation={setPickupLocation}/>

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

                                <AwesomeButton type="primary" className="special-btn" style={buttonStyle} onPress={submit}>
                                    Submit Cars
                                </AwesomeButton>

                                <AwesomeButton type="primary" className="special-btn" style={buttonStyle} onPress={handleTest}>
                                    Test
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
            }   
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


