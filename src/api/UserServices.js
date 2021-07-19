import User from "../components/admin/User";

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

export function getAllUsers() {
    return fetch("/api/users", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((response) => {
        let newUsers = response.map((u) => {
            return new User(u);
        })
        return newUsers;
    });
}

export function addUser(user) {
    let data = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        pickupLocation: user.pickupLocation,
        canDrive: user.canDrive
    }


    return fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((response) => {
        return response;
    })
}

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
    return fetch(`/api/users/${id}`, {
        method: "delete",
    })
}