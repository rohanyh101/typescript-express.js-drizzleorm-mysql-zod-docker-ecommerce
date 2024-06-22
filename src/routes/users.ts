import { Router } from "express";
import requireUser from "../middlewares/requireUser";
import adminMiddleware from "../middlewares/admin";
import { addAddress, deleteAddress, getAddresses } from "../controllers/users";
import validateResource from "../middlewares/validate.resource";
import { CreateAddressSchema, DeleteAddressSchema, GetAddressSchema } from "../schema/users";

const UserRouter: Router = Router();

UserRouter.use('/', [requireUser])

UserRouter.get("/", validateResource(GetAddressSchema), getAddresses)

UserRouter.post("/", validateResource(CreateAddressSchema), addAddress)

UserRouter.delete("/:address_id", validateResource(DeleteAddressSchema), deleteAddress)

export default UserRouter;