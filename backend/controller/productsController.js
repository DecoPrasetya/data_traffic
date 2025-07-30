import { PrismaClient } from "@prisma/client"
import { json } from "express"
const prisma = new PrismaClient()



export const getProducts = async (req, res) => {
    try {
        let product
        if (req.role === "admin") {
            product = await prisma.product.findMany({
                select: {
                    uuid: true,
                    name: true,
                    qty: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            uuid: true,
                            username: true,
                            email: true,
                            role: true
                        }
                    }
                }
            })
        } else {
            product = await prisma.product.findMany({
                where: {
                    userId: req.userId
                },
                select: {
                    uuid: true,
                    name: true,
                    qty: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            uuid: true,
                            username: true,
                            email: true,
                            role: true
                        }
                    }
                }
            })
        }
        if (!product) return res.status(404).json({ msg: "product not found" })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await prisma.product.findUnique({
            where: {
                uuid: req.params.id
            }
        })
        if (!response) return res.status(404).json({ msg: "product not found" })
        let product;
        if (req.role === "admin") {
            product = await prisma.product.findUnique({
                where: {
                    id: response.id
                },
                select: {
                    uuid: true,
                    name: true,
                    qty: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            uuid: true,
                            username: true,
                            email: true,
                            role: true
                        }
                    }
                }
            })
        } else {
            if (response.userId !== req.userId) return res.status(403).json({ msg: "prohibited access" })
            product = await prisma.product.findFirst({
                where: {
                    AND: [
                        { id: response.id },
                        { userId: req.userId }
                    ]
                },
                select: {
                    uuid: true,
                    name: true,
                    qty: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            uuid: true,
                            username: true,
                            email: true,
                            role: true
                        }
                    }
                }
            })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createProduct = async (req, res) => {
    const { name, qty } = req.body
    try {
        await prisma.product.create({
            data: {
                name: name,
                qty: qty,
                userId: req.userId
            }
        })
        res.status(201).json({ msg: "product created" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const editProduct = async (req, res) => {
    try {
        const response = await prisma.product.findUnique({
            where: {
                uuid: req.params.id
            }
        })
        if (!response) return res.status(404).json({ msg: "product not found" })
        const { name, qty } = req.body
        if (req.role === "admin") {
            await prisma.product.update({
                data: {
                    name,
                    qty
                },
                where: {
                    id: response.id
                }
            })
        } else {
            if (response.userId !== req.userId) return res.status(403).json({ msg: "prohibited access" })
            await prisma.product.update({
                data: {
                    name,
                    qty
                },
                where: {
                    id: response.id,
                    userId: req.userId
                }
            })
        }
        res.status(200).json({ msg: "product updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const response = await prisma.product.findUnique({
            where:{
                uuid: req.params.id
            }
        })
        if(!response) return res.status(404).json({msg: "product not found"})
        if (req.role === "admin") {
            await prisma.product.delete({
                where: {
                    id: response.id
                }
            })
        } else {
            if(response.userId !== req.userId) return res.status(403).json({msg: "prohibited access"})
            await prisma.product.delete({
                where:{
                    id: response.id,
                    userId: req.userId
                }
            })
        }
        res.status(200).json({msg: "product deleted"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}