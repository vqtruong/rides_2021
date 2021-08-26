import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UsersDAO from "./dao/usersDAO.js";
import CarsDAO from "./dao/carsDAO.js";
import PickupLocationsDAO from "./dao/pickupLocationsDAO.js";
import PickupTimesDAO from "./dao/pickupTimesDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;
MongoClient.connect(process.env.RIDES_DB_URI, 
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await UsersDAO.injectDB(client);
        await CarsDAO.injectDB(client);
        await PickupLocationsDAO.injectDB(client);
        await PickupTimesDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Listening on Port ${port}`)
        })
    }
)
