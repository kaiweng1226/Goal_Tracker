import "reflect-metadata";
import {createConnection} from "typeorm";
import { Goal } from "./entity/Goal";
import {User} from "./entity/User";

function createUser(){
    return createConnection().then(async connection => {

        console.log("Inserting a new user into the database...");
        const user = new User();
        user.name = "Timber";
        user.email = "user@gmail.com";
        await connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);
    
        console.log("Loading users from the database...");
        const users = await connection.manager.find(User);
        console.log("Loaded users: ", users);
    
        console.log("Here you can setup and run express/koa/any other framework.");
    
    }).catch(error => console.log(error));
}

export function createGoal(goal:Goal){
    return createConnection().then(async connection => {

        console.log("Inserting a new goal into the database...");
        let g = await connection.manager.save(goal);
        return g;
    
    }).catch(error => console.log(error));
}

export function createGoal(goal:Goal){
    return createConnection().then(async connection => {

        console.log("Inserting a new goal into the database...");
        let g = await connection.manager.save(goal);
        return g;
    
    }).catch(error => console.log(error));
}