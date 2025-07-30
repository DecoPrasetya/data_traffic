import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) return res.status(401).json({msg: "please login first"})
    const user = await prisma.user.findUnique({
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "user not found"})
    req.userId = user.id
    req.role = user.role
    next()
}

export const admin = async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where:{
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "user not found"})
    if (user.role !== "admin") return res.status(403).json({msg: "prohibited access"})
    next()
}