const express = require('express')
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

import "reflect-metadata";
import {createConnection} from "typeorm";

import {Goal} from "./entity/Goal"
import {User} from "./entity/User"
import {createGoal} from "./db"

const port = 3000

/*
let goals = [
    {id: 1, goal: "Read", timeCommitment: 60, logging: 5},
    {id: 2, goal: "Run", timeCommitment: 120, logging: 10},
    {id: 3, goal: "Rest", timeCommitment: 180, logging: 5}
]
*/

// ask about res.json vs return res.send

createConnection().then(connection => {
    
    const userRepository = connection.getRepository(User);
    const goalRepository = connection.getRepository(Goal);

    // Get All Goals

    app.get('/', async (req, res) => {
        const goals = await goalRepository.find();
        res.json(goals)
    })
    
    // Get Single Goal

    app.get('/goal/:goalid', async (req, res) => {
        const goal = await goalRepository.findOne(req.params.goalid)
        return res.send(goal)
    })
      
    // Create A Goal

    app.post('/', async function (req, res) {
        const goal = await goalRepository.create(req.body)
        const results = await goalRepository.save(goal)
        return res.send(results)
    })
    
    // Update A Goal
    
    app.put('/goal/:goalid', async (req, res) => {
        const goal = await goalRepository.findOne(req.params.goalid)
        goalRepository.merge(goal, req.body)
        const results = await goalRepository.save(goal)
        return res.send(results)
    })

    // Delete A Goal

    app.delete('/goal/:goalid', async (req, res) => {
        const results = await goalRepository.delete(req.params.goalid)
        return res.send(results)
    })
    
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
})