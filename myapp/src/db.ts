import "reflect-metadata";
import {getConnection} from "typeorm";
import {Goal} from "./entity/Goal";

export async function getAllGoals(){
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

