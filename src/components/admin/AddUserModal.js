import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import User from "./User";
import { addUser } from "../../api/UserServices.js";
import "./styles.css";

export default function AddUserModal({showAddUser, setShowAddUser, users, setUsers, locations, pickupLocation, setPickupLocation}) {
    const handleCloseAddUser = () => setShowAddUser(false);

    function handleAddUserModalSubmit(event) {
        event.preventDefault();
        const userJSON = {
            "name": name,
            "email": email,
            "phone": phone,
            "pickupLocation": pickupLocation,
            "assigned": false,
            "canDrive": canDrive,
            "isTemporaryUser": true,
            "capacity": capacity
        }

        addUser(userJSON).then((rsp) => {
            userJSON.ID = rsp.data._id;
            setUsers(users.concat(new User(userJSON)));
        });
        
        handleCloseAddUser();
        setName("");
        setEmail("");
        setPhone("");
        setPickupLocation(locations[0].name);
        setCanDrive(false);
    }

    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [canDrive, setCanDrive] = useState(false);
    const [capacity, setCapacity] = useState();

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


    return <Modal show={showAddUser} onHide={handleCloseAddUser}>
        <Modal.Header closeButton>
            <Modal.Title className="modalTitle"> Add Temporary User </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <form className="addUserForm" autocomplete="false" onSubmit={handleAddUserModalSubmit}>
                <div className="center">
                    <div className="form-group">
                        <div><label htmlFor="name">Full Name</label></div>   
                        <input type="name" className="" value={name} onChange={handleNameChange} id="name" placeholder="Enter your name..." autoFocus/>
                    </div>

                    <div className="form-group">
                        <div><label htmlFor="name">Email</label></div>
                        <input type="email" className="" value={email} onChange={handleEmailChange} id="email" placeholder="Enter your email..." />
                    </div>

                    <div className="form-group">
                        <div><label htmlFor="name">Phone</label></div>
                        <input type="text" className="" value={phone} onChange={handlePhoneChange} id="phone" placeholder="Enter your phone..."/>
                    </div>

                    <div className="form-group">
                        <div><label htmlFor="name">Pickup Locations</label></div>
                        <select className="select pickupTime" onChange={handleLocationChange}>
                                { locations.map((location) => {
                                    return <option className="select-option">{location.name}</option>
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

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddUser}>
                    Close
                </Button>
                <Button variant="success" onClick={handleAddUserModalSubmit}>
                    Add User
                </Button>
            </Modal.Footer>
        </Modal.Body>

        
    </Modal>
}