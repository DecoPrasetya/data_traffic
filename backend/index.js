import express from 'express'
import cors from 'cors'
import session from "express-session"
import UsersRoutes from './routes/usersRoute.js'
import ProductsRoutes from './routes/ProductsRoute.js'
import AuthRoutes from './routes/authRoute.js'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import MongoStore from 'connect-mongo'
dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Session store untuk MongoDB
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    ttl: 24 * 60 * 60 // 1 hari
  }),
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: "auto"
  }
}))

// CORS configuration
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}))

// Middleware
app.use(express.json())

// Routes
app.use(UsersRoutes)
app.use(ProductsRoutes)
app.use(AuthRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Server startup
const PORT = process.env.APP_PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

