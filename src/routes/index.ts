import { Router } from "express"
import authRouter from "./auth"
import productRouter from "./products"
import UserRouter from "./users"

const rootRouter: Router = Router()

rootRouter.use('/auth', authRouter)

rootRouter.use('/products', productRouter)

rootRouter.use('/address', UserRouter)

export default rootRouter