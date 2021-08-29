import "reflect-metadata";
import {getConnection} from "typeorm";
import {Goal} from "./entity/Goal";
import {User} from "./entity/User";

export function getAllGoals(){
    const connection = getConnection()
    const allGoals = connection.manager.find(Goal);
    return allGoals
}

export function getGoal(goalID){
    const connection = getConnection()
    const goal = connection.manager.findOne(Goal, goalID)
    return goal
}

export function createGoal(goal:Goal){
    const connection = getConnection()
    const newGoal = connection.manager.save(goal);
    return newGoal
}

export async function updateGoal(goalID, changes){
    const connection = getConnection()
    let goal = await connection.manager.findOne(Goal, goalID)
    const keys = Object.keys(changes)
    keys.forEach(key => goal[key] = changes[key])
    const results = connection.manager.save(goal)
    return results
}

export function deleteGoal(goalID){
    const connection = getConnection()
    const results = connection.manager.delete(Goal, goalID)
    return results
}


export function getAllUsers(){
    const connection = getConnection()
    const allUsers = connection.manager.find(User);
    return allUsers
}

export function getUser(userID){
    const connection = getConnection()
    const user = connection.manager.findOne(User, userID)
    return user
}

export function createUser(user:User){
    const connection = getConnection()
    const newUser = connection.manager.save(user);
    return newUser
}

export async function updateUser(userID, changes){
    const connection = getConnection()
    let user = await connection.manager.findOne(User, userID)
    const keys = Object.keys(changes)
    keys.forEach(key => user[key] = changes[key])
    const results = connection.manager.save(user)
    return results
}

export function deleteUser(userID){
    const connection = getConnection()
    const results = connection.manager.delete(User, userID)
    return results
}