import {Router} from "express"
import {Goal} from "../entity/Goal"
import {getAllGoals, getGoal, createGoal, updateGoal, deleteGoal} from "../db"

const router = Router()

// Get All Goals

router.get('/', async (req, res) => {
    const goals = await getAllGoals()
    return res.send(goals)
})

// Get Single Goal

router.get('/:goalID', async (req, res) => {
    const goal = await getGoal(req.params.goalID)
    return res.send(goal)
})

// Create A Goal

router.post('/', async function (req, res) {
    const goal = new Goal()
    goal.goal = req.body.goal
    goal.timeCommitment = req.body.timeCommitment
    goal.logging = req.body.logging
    const results = await createGoal(goal)
    return res.send(results)
})

// Update A Goal

router.put('/:goalID', async (req, res) => {
    const results = await updateGoal(req.params.goalID, req.body)
    return res.send(results);
})

// Delete A Goal

router.delete('/:goalID', async (req, res) => {
    const results = await deleteGoal(req.params.goalID)
    return res.send(results)
})

export default router
