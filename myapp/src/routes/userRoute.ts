import {Router} from "express"
import {User} from "../entity/User"
import {getAllUsers, getUser, createUser, updateUser, deleteUser} from "../db"

const router = Router()

// Get All Users

router.get('/', async (req, res) => {
    const users = await getAllUsers()
    return res.send(users)
})

// Get Single User

router.get('/:userID', async (req, res) => {
    const user = await getUser(req.params.userID)
    return res.send(user)
})

// Create A User

router.post('/', async function (req, res) {
    const user = new User()
    user.name = req.body.name
    user.email = req.body.email
    const results = await createUser(user)
    return res.send(results)
})

// Update A User

router.put('/:userID', async (req, res) => {
    const results = await updateUser(req.params.userID, req.body)
    return res.send(results);
})

// Delete A User

router.delete('/:userID', async (req, res) => {
    const results = await deleteUser(req.params.userID)
    return res.send(results)
})

export default router
