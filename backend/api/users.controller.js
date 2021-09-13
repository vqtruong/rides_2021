import UsersDAO from "../dao/usersDAO.js";

export default class UsersCtrl {
    static async apiGetUsers(req, res, next) {
        let filters = {};

        if (req.query.pickupLocation) {
            filters.pickupLocation = req.query.pickupLocation;
        } else if (req.query.name) {
            filters.name = req.query.name;
        }

        const { usersList } = await UsersDAO.getUsers({filters});

        let response = {
            usersList : usersList,
            filters: filters
        }

        res.json(response);
    }

    static async apiPostUser(req, res, next) {
        try {
            const dateCreated = new Date();
            const { name, pickupLocation, phone, email, canDrive, isTemporaryUser, assigned, capacity } = req.body;

            const userInfo = {
                name: name,
                dateCreated: dateCreated,
                pickupLocation: pickupLocation,
                phone: phone,
                email: email,
                canDrive: canDrive,
                isTemporaryUser: isTemporaryUser,
                assigned: assigned,
                capacity: capacity
            }     

            const userResponse = await UsersDAO.addUser(userInfo);
            res.json({status: "Success!", _id: userResponse.insertedId});

        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const { ID, name, pickupLocation, phone, email, canDrive, isTemporaryUser, assigned, capacity } = req.body.data;

            const userInfo = {
                ID: ID,
                name: name,
                pickupLocation: pickupLocation,
                phone: phone,
                email: email,
                canDrive: canDrive,
                isTemporaryUser: isTemporaryUser,
                assigned: assigned,
                capacity: capacity
            }

            const userResponse = await UsersDAO.updateUser(userInfo);

            let { error } = userResponse;
            if (error) {
                res.status(400).json({error});
            }
            if (userResponse.modifiedCount === 0) {
                throw new Error("Unable to update user. Potentially invalid ID.");
            }
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const userID = req.body.ID;
            const userResponse = await UsersDAO.deleteUser(userID);
            res.json({ status: "Success!" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}