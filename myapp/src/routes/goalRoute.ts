import {Router} from "express"
import {Goal} from "../entity/Goal"
import {getAllGoals, getGoal, createGoal, updateGoal, deleteGoal} from "../db"
import {body, validationResult, param} from 'express-validator';

const router = Router()

// Get All Goals

router.get('/', async (req, res) => {
    const goals = await getAllGoals()
    return res.send(goals)
})

// Get Single Goal

router.get('/:goalID', param('goalID', "goalID should be a valid number").isInt(), async (req, res) => {
    const goal = await getGoal(req.params.goalID)

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if(!goal){
        return res.status(404).json({ errors: `There is no goal with goalID ${req.params.goalID}. Please enter a valid goalID.` });
    }

    return res.json({goal:goal})
})

// Create A Goal

router.post('/', async function (req, res) {
    const goal = new Goal(req.body.goal, req.body.timeCommitment, req.body.logging)
    const results = await createGoal(goal)
    return res.send(results)
})

// Update A Goal

router.put('/:goalID', param('goalID', "goalID should be a valid number").isInt(),async (req, res) => {
    const checkGoal = await getGoal(req.params.goalID)

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if(!checkGoal){
        return res.status(404).json({ errors: `There is no goal with goalID ${req.params.goalID}. Please enter a valid goalID.` });
    }

    const goal = await updateGoal(req.params.goalID, req.body)
    
    return res.json({goal:goal});
})

// Delete A Goal

router.delete('/:goalID', param('goalID', "goalID should be a valid number").isInt(), async (req, res) => {
    const checkGoal = await getGoal(req.params.goalID)

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if(!checkGoal){
        return res.status(404).json({ errors: `There is no goal with goalID ${req.params.goalID}. Please enter a valid goalID.` });
    }

    const results = await deleteGoal(req.params.goalID)
    return res.send(results)
})

export default router
