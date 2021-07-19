import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../admin/User";
import { getUserByID } from "../../api/UserServices";
import "./styles.css";

export default function Profile () {
    const { id } = useParams();
    const [user, setUser] = useState(new User({
        "id": null,
        "name": "None",
        "phone": "None",
        "pickupLocation": null,
        "assigned": false
    }))

    useEffect(() => {
        document.title = "Profile";
        getUserByID(id).then((rsp) => {
            setUser(rsp);
        })
    }, [id])
    return (
        <div className="">
            <h3> Name </h3>
            <h5> { user.name } </h5>

            <h3> Email </h3>
            <h5> { user.email } </h5>

            <h3> Phone </h3>
            <h5> { user.phone } </h5>

            <h3> Pickup Location </h3>
            <h5> { user.pickupLocation } </h5>
        </div>
    )
}