import {Router} from "express"
import {Goal} from "../entity/Goal"
import {getAllGoals, getGoal, createGoal, updateGoal, deleteGoal} from "../db"
import {validationResult, param} from 'express-validator';

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

    // return res.json({goal:goal})
    
    // return res.render("template.html", goal)

    res.format({
      'text/html': function () {
        res.render('singleGoal', goal)

        },
      
        'application/json': function () {
            res.json({goal:goal})
        },
      
        default: function () {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable')
        }
      })
})

// Create A Goal

router.post('/', async function (req, res) {
    const goal = new Goal(req.body.goal, req.body.timeCommitment, req.body.logging)
    const results = await createGoal(goal)
    const goals = await getAllGoals()

    res.format({
        'text/html': function () {
            res.render('index', {title: 'Goal Tracker', goals})

        },
      
        'application/json': function () {
            res.send(results)
        },
      
        default: function () {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable')
        }
      })
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

router.get('/:goalID/update', param('goalID', "goalID should be a valid number").isInt(),async (req, res) => {
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

    const goals = await getAllGoals()

    res.format({
        'text/html': function () {
            res.render('index', {title: 'Goal Tracker', goals})

        },
      
        'application/json': function () {
            res.send(results)
        },
      
        default: function () {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable')
        }
      })
})

router.get('/:goalID/delete', param('goalID', "goalID should be a valid number").isInt(), async (req, res) => {
  const checkGoal = await getGoal(req.params.goalID)

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if(!checkGoal){
      return res.status(404).json({ errors: `There is no goal with goalID ${req.params.goalID}. Please enter a valid goalID.` });
  }

  const results = await deleteGoal(req.params.goalID)

  const goals = await getAllGoals()

  res.format({
      'text/html': function () {
          res.render('index', {title: 'Goal Tracker', goals})

      },
    
      'application/json': function () {
          res.send(results)
      },
    
      default: function () {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable')
      }
    })
})

export default router
