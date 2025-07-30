import argon2 from "argon2"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getUsers = async (req, res) => {
    try {
        const user = await prisma.user.findMany({
            select: {
                uuid: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                uuid: req.params.id
            },
            select: {
                uuid: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
        if (!user) return res.status(404).json({ msg: 'user not found' })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createUser = async (req, res) => {
    const { username, email, password, confPassword, role } = req.body
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password is not macth" })
    const hashPassword = await argon2.hash(password)
    try {
        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword,
                role: role
            }
        })
        res.status(201).json({ msg: "user created" })
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
}

export const editUser = async (req, res) => {
    const { username, email, password, confPassword, role } = req.body
    const user = await prisma.user.findUnique({
        where: {
            uuid: req.params.id
        }
    })
    let hashPassword
    if (!user) return res.status(404).json({ msg: "user not found" })
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password)
    }
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password is not match" })

    try {
        await prisma.user.update({
            data: {
                username: username,
                email: email,
                password: hashPassword,
                role: role
            },
            where: {
                id: user.id
            }
        })
        res.status(200).json({ msg: "user updated" })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteUser = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            uuid: req.params.id
        }
    })
    try {
        await prisma.user.delete({
            where: {
                id: user.id
            }
        })
        res.status(200).json({ msg: "user deleted" })
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}