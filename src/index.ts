import express from 'express';
import type { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/errors';
import authMiddleware from './middlewares/auth';
dotenv.config()

const PORT = process.env.PORT || 8080

const app: Express = express()

app.use(express.json())

app.use('/', errorMiddleware)

app.use('/', authMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "HI MOM!" })
})

app.use('/api', rootRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})