import "reflect-metadata";
import {getConnection} from "typeorm";
import {User} from "../entity/User";
export function getAllUsers(){
    const connection = getConnection()
    const allUsers = connection.manager.find(User);
    return allUsers
}

export function getUserById(id : number){
    const connection = getConnection()
    const user = connection.manager.findOne(User, id)
    return user
}
export function getUserByEmail(email :string){
    const connection = getConnection()
    const user = connection.manager.findOne(User, { email })
    return user
}
export function createUser(user:User){
    const connection = getConnection()
    const newUser = connection.manager.save(user);
    return newUser
}

export async function updateUser(userID : number, changes){
    const connection = getConnection()
    let user = await connection.manager.findOne(User, userID)
    const keys = Object.keys(changes) // TODO changes has an any type, so the key may not exist in user
    keys.forEach(key => user[key] = changes[key])
    const results = connection.manager.save(user)
    return results
}

export function deleteUser(userID:number){
    const connection = getConnection()
    const results = connection.manager.delete(User, userID)
    return results
}
