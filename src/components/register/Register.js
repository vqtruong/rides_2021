import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import User from "../admin/User";
import { addUser } from "../../api/UserServices";
import { Alert, Button } from 'react-bootstrap';
import "./styles.css";

export default function Register () {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const history = useHistory();

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const [pickupLocation, setPickupLocation] = useState("EVK");
    const [canDrive, setCanDrive] = useState(false);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePhoneChange(event) {
        setPhone(event.target.value);
    }

    function handlePickupLocationChange(event) {
        setPickupLocation(event.target.value);
    }

    function handleCanDriveChange(event) {
        setCanDrive(event.target.checked);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let valid = true;

        if (name.trim().length === 0) {
            setNameError(true);
            setTimeout(() => { setNameError(false) }, 3000);
            valid = false;
        }

        if (email.trim().length === 0 || !email.includes('@')) {
            setEmailError(true);
            setTimeout(() => { setEmailError(false) }, 3000);
            valid = false;
        }

        if (phone.trim().length === 0) {
            setPhoneError(true);
            setTimeout(() => { setPhoneError(false) }, 3000);
            valid = false;
        }


        if (valid) {
            localStorage.setItem("logged_in", true);
            setTimeout(() => {history.push("/admin");}, 500)
        }
    }

    useEffect(() => {
        document.title = "Register";
        if (localStorage.getItem("logged_in") === "true") {
            history.push("/admin");
        }
    }, [history])

    return (
        <div id="register">
            <h1> Lighthouse Rides </h1>
            <form>
                <div className="center">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="name" className="form-control" value={name} onChange={handleNameChange} id="name" placeholder="Enter your name..."/>
                        { nameError && 
                            <Alert className="alert-box" variant="danger">
                                Please enter a name.
                            </Alert>
                        }
                            
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="email" className="form-control" value={email} onChange={handleEmailChange} id="email" placeholder="Enter your email..."/>
                        { emailError && 
                            <Alert className="alert-box" variant="danger">
                                Please enter a valid email.
                            </Alert>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Phone</label>
                        <input type="text" className="form-control" value={phone} onChange={handlePhoneChange} id="phone" placeholder="Enter your phone..."/>
                        { phoneError && 
                            <Alert className="alert-box" variant="danger">
                                Please only enter digits..
                            </Alert>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="pickupLocations">Pickup Locations</label>
                        <select className="form-control" id="pickupLocations" onChange={handlePickupLocationChange}>
                            <option>EVK</option>
                            <option>Village</option>
                            <option>Parkside</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={handleCanDriveChange} id="defaultCheck1"></input>
                            <label class="form-check-label" htmlFor="defaultCheck1" > Are you able to drive? </label>
                        </div>
                    </div>
                </div>
                    
                <div className="submit-row">    
                    <button className="btn btn-success" id="submit-btn" onClick={handleSubmit}> 
                        Register
                    </button>
                </div>
                <small id="login" className="form-text text-muted">Already have an account? Login <a href="./login">here.</a></small>
            </form>
        </div>
    )
}