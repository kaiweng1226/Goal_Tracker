const express = require('express')
export const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

import "reflect-metadata";
import {createConnection} from "typeorm";
import {Goal} from "./entity/Goal"

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
    
    // const userRepository = connection.getRepository(User);
    const goalRepository = connection.getRepository(Goal);

    // Get All Goals


    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
})
