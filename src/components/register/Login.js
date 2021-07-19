import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { userExists } from "../../api/UserServices";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css";

export default function Login () {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const history = useHistory();

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePhoneChange(event) {
        setPhone(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        userExists({
            "name": name, 
            "email": email,
            "phone": phone,
        }).then((found) => {
            if (!found) {
                toast.error('Your login does not match any previous logins. Please try again or register a new account.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                localStorage.setItem("logged_in", false);
            } else {
                localStorage.setItem("logged_in", true);
                history.push("/admin");
            }
        })
    }

    useEffect(() => {
        document.title = "Login";
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
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="email" className="form-control" value={email} onChange={handleEmailChange} id="email" placeholder="Enter your email..."/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Phone</label>
                        <input type="text" className="form-control" value={phone} onChange={handlePhoneChange} id="phone" placeholder="Enter your phone..."/>
                    </div>

                </div>
                    
                <div className="submit-row">    
                    <button type="submit" className="btn btn-success" id="submit-btn" onClick={handleSubmit}> 
                        Log In
                    </button>
                </div>
                <small id="login" className="form-text text-muted">
                    Don't have an account. Register 
                    <Link to="./register"> here.</Link>
                </small>
            </form>

            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    )
}