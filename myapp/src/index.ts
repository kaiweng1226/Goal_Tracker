import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection().then(async connection => {

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);
    const result = await connection.manager.findOne(User, 1)
    console.log(result)

}).catch(error => console.log(error));