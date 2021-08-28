import { Router } from "express"
import {Goal} from "./entity/Goal"
import {createGoal} from "./db"

const router = Router()
router.get('/', async (req, res) => {
        // const goals = await goalRepository.find();
        // res.json(goals)
  res.send("hello world")
    })

    // Get Single Goal

    router.get('/goal/:goalid', async (req, res) => {
        // const goal = await goalRepository.findOne(req.params.goalid)
        // return res.send(goal)
    })

    // Create A Goal

    router.post('/', async function (req, res) {
        // const goal = await goalRepository.create(req.body)
        // const results = await goalRepository.save(goal)
        let goal = new Goal()
        goal.goal = req.body.goal
        goal.timeCommitment = req.body.timeCommitment
        goal.logging = req.body.logging
        let results = await createGoal(goal)
        return res.send(results)
    })

    // Update A Goal

    router.put('/goal/:goalid', async (req, res) => {
        // const goal = await goalRepository.findOne(req.params.goalid)
        // goalRepository.merge(goal, req.body)
        // const results = await goalRepository.save(goal)
        // return res.send(results)
    })

    // Delete A Goal

    router.delete('/goal/:goalid', async (req, res) => {
        // const results = await goalRepository.delete(req.params.goalid)
        // return res.send(results)
    })
export default router
