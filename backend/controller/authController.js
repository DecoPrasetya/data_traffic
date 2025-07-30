import { PrismaClient } from "@prisma/client";
import argon2d from "argon2";

const prisma = new PrismaClient()


export const login = async (req, res) => {  
    console.log("Login request received for email:", req.body.email);
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if (!user) return res.status(404).json({ msg: "user not found" })
    const match = await argon2d.verify(user.password, req.body.password)
    if (!match) return res.status(400).json({ msg: "password wrong" })
    req.session.userId = user.uuid
    const uuid = user.uuid
    const username = user.username
    const email = user.email
    const role = user.role
    res.status(200).json({uuid, username, email, role, msg: "login successfully"})
}

export const me = async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ msg: "please login first" })
    const user = await prisma.user.findUnique({
        where: {
            uuid: req.session.userId
        },
        select: {
            uuid: true,
            username: true,
            email: true,
            role: true
        }
    })
    if (!user) return res.status(404).json({ msg: "user not found" })
    res.status(200).json(user)
}

export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ msg: "cannot logout" })
        res.status(200).json({ msg: "logout successfully" })
    })
}