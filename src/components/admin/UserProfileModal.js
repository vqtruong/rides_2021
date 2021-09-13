import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import _ from "lodash";
import "./styles.css";

import { updateUser } from './../../api/UserServices';

export default function UserProfile({showUserProfile, setShowUserProfile, users, setUsers, user, locations}) {
    const handleCloseUserProfile = () => setShowUserProfile(false);
        
    const [name, setName] = useState(user.name); 
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [pickupLocation, setPickupLocation] = useState(user.pickupLocation);
    const [canDrive, setCanDrive] = useState(user.canDrive);
    const [capacity, setCapacity] = useState(user.capacity);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePhoneChange(event) {
        setPhone(event.target.value);
    }

    function handleLocationChange(event) {
        setPickupLocation(event.target.value);
    }

    function handleCanDriveChange(event) {
        setCanDrive(event.target.checked);
        if (event.target.checked) setCapacity(4);
        else setCapacity();
    }

    function handleCapacityChange(event) {
        setCapacity(parseInt(event.target.value));
    }

    function handleUserProfileSubmit(event) {
        event.preventDefault();
        let newUsers = users.map((u) => {
            if (u.ID === user.ID) {
                let newUser = _.cloneDeep(user);
                newUser.name = name;
                newUser.email = email;
                newUser.phone = phone;
                newUser.pickupLocation = pickupLocation;
                newUser.canDrive = canDrive;
                newUser.capacity = capacity;
                updateUser(newUser);
                return newUser;
            }
            return u;
        });
        setUsers(newUsers);
        handleCloseUserProfile();
    }

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setPickupLocation(user.pickupLocation);
        setCanDrive(user.canDrive);
    }, [user])

    return <>
        <Modal show={showUserProfile} onHide={handleCloseUserProfile} >
            <Modal.Header closeButton>
                <Modal.Title className="modalTitle"> <span className="userProfileName">{user.name}</span> Profile </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form className="addUserForm" autocomplete="false" onSubmit={handleUserProfileSubmit}>
                    <div className="center">
                        <div className="form-group">
                            <div><label htmlFor="name">Full Name</label></div>   
                            <input type="name" className="prefilledData" value={name} onChange={handleNameChange} id="name" placeholder="Enter your name..."/>
                        </div>

                        <div className="form-group">
                            <div><label htmlFor="name">Email</label></div>
                            <input type="email" className="prefilledData" value={email} onChange={handleEmailChange} id="email" placeholder="Enter your email..." />
                        </div>

                        <div className="form-group">
                            <div><label htmlFor="name">Phone</label></div>
                            <input type="text" className="prefilledData" value={phone} onChange={handlePhoneChange} id="phone" placeholder="Enter your phone..."/>
                        </div>

                        <div className="form-group">
                            <div><label htmlFor="name">Pickup Locations</label></div>
                            <select className="select pickupTime" onChange={handleLocationChange} value={pickupLocation}>
                                    { locations.map((time) => {
                                        return <option className="select-option">{time.name}</option>
                                    })}                                
                            </select>
                        </div>  

                        <div className="form-group">
                            <div className="form-check noSelect" id="formCanDrive">
                                <input id="defaultCheck0" className="form-check-input " type="checkbox" checked={canDrive} onChange={handleCanDriveChange} ></input>
                                <label id="defaultCheck1" className="form-check-label" htmlFor="defaultCheck0" > Are you able to drive? </label>
                            </div>  
                        </div>

                        <div className="form-group">
                            <div><label htmlFor="name">If you can drive, how many can you take?</label></div>
                            <input type="number" min="0" value={capacity} onChange={handleCapacityChange} disabled={!canDrive}></input>
                        </div>
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUserProfile}>
                    Close
                </Button>
                <Button variant="success" onClick={handleUserProfileSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}