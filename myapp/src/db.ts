import "reflect-metadata";
import { getConnection} from "typeorm";
import { Goal } from "./entity/Goal";
import {User} from "./entity/User";

function createUser(){
    const connection = getConnection();
    const user = new User();
    user.name = "Timber";
    user.email = "user@gmail.com";
    return connection.manager.save(user);

}

export function createGoal(goal:Goal){
    const connection = getConnection()
    console.log("Inserting a new goal into the database...");
    let g = connection.manager.save(goal);
    return g;
}

// export function createGoal(goal:Goal){
//     return createConnection().then(async connection => {

//         console.log("Inserting a new goal into the database...");
//         let g = await connection.manager.save(goal);
//         return g;

//     }).catch(error => console.log(error));
// }
