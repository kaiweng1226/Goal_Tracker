const express = require('express')
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const port = 3000

let goals = [
    {id: 1, goal: "Read", timeCommitment: 60, logging: 5},
    {id: 2, goal: "Run", timeCommitment: 120, logging: 10},
    {id: 3, goal: "Rest", timeCommitment: 180, logging: 5}
]

/*
Model - { id : unique int, goal: string, time-commitment: number/date-format, logging: number }
[dates]
*/

app.get('/', (req, res) => {
  res.send({goals:goals})
})

app.get('/:goalid', (req, res) => {
    res.send(goals[req.params.goalid - 1])
})

app.post('/', function (req, res) {
    console.log(req.body)
    goals.push(req.body)
    console.log(goals)
    res.json(req.body)
})

app.put('/:goalid', (req, res) => {
    let keys = Object.keys(req.body)
    let goal = goals[req.params.goalid -1]
    keys.forEach((key) => {
        goal[key] = req.body[key]
    })

    /* same as forEach
    for(let i = 0; i < keys.length; i++){
        goal[keys[i]] = req.body[keys[i]]
    }
    */
   
    console.log(keys)
    res.json(goals)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})