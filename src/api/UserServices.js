import User from "../components/admin/User";
import http from "./http-common.js";

export function getUserByID(id) {
    return fetch(`/api/users/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((response) => {
        return new User(response);
    })
}

export async function getAllUsers() {
    return http.get(`users/`).then((rsp) => {
        return rsp.data.usersList;
    });
}

export function addUser(user) {
    let data = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        pickupLocation: user.pickupLocation,
        canDrive: user.canDrive,
        isTemporaryUser: user.temporaryUser
    }

    return http.post(`users`, data);
}

// TO DO: Optimize this to do it all backend instead of front end
export async function userExists(user) {
    let allUsers = await getAllUsers();
    for (let i = 0; i < allUsers.length; i++) {
        let current = allUsers[i];
        if (current.name === user.name && current.email === user.email && current.phone === user.phone) {
            return true;
        }
    }
    return false;
}

export function deleteUserByID(id) {
    return http.delete(`users/`, {data: {ID: id}});
}