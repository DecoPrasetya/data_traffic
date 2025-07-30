import express from 'express'
import {
    getUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser
} from '../controller/usersController.js'
import { verifyUser, admin } from '../middleware/authUser.js'

const router = express.Router()

router.get('/users', verifyUser, admin, getUsers)
router.get('/users/:id', verifyUser, admin, getUserById)
router.post('/users', verifyUser, admin, createUser)
router.patch('/users/:id', verifyUser, admin, editUser)
router.delete('/users/:id', verifyUser, admin, deleteUser)

export default router