import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

let users;

export default class UsersDAO {
    // Called when initially connected to database (aka when server starts)
    static async injectDB(conn) {
        // If already connected, do nothing
        if (users) {
            return;
        }

        try {
            users = await conn.db(process.env.RIDES_NS).collection("users");
        } catch (e) {
            console.error(`Unable to establish connection in usersDAO: ${e}`)
        }
    }

    static async getUsers({filters=null} = {}) {
        let query;
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } 
            else if ("pickupLocation" in filters) {
                query = { "pickupLocation": {$eq: filters["pickupLocation"]}};
            }
        }

        let results;
        try {
            results = await users.find(query);
        } catch (e) {
            console.error(`Unable to issue find command ${e}`);
            return { usersList: []};
        }

        try {
            const usersList = await results.toArray();
            return { usersList };
        } catch (e) {
            console.error(`Unable to convert to array: ${e} `);
            return { usersList: []};
        }
    }

    static async addUser({name, dateCreated, pickupLocation, phone, email, canDrive, isTemporaryUser}) {
        try {
            const newUser = {
                date: dateCreated,
                name: name,
                pickupLocation: pickupLocation,
                phone: phone, 
                email: email,
                canDrive: canDrive,
                isTemporaryUser: isTemporaryUser
            }
            return await users.insertOne(newUser);
        } catch (e) {
            console.error(`Unable to add user: ${e}`);
            return { error: e }
        }
    }

    static async updateUser(userInfo) {
        try {
            const { ID, name, pickupLocation, phone, email, canDrive, isTemporaryUser } = userInfo;
            const updateResponse = await users.updateOne(
                { _id: ObjectID(ID) },
                { $set: { name: name, pickupLocation: pickupLocation, phone, email, canDrive, isTemporaryUser }}
                
            )
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update user: ${e}`);
            return { error: e }
        }
    }

    static async deleteUser(userID) {
        try {
            const deleteResponse = await users.deleteOne({
                _id: ObjectID(userID)
            })
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete user: ${e}`);
            return { error: e }
        }
    }
}