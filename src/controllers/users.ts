import type { Request, Response } from "express";
import { AddressTable } from "../../drizzle/schema";
import { db } from "../database/db";
import { eq } from "drizzle-orm";

export const addAddress = async (req: Request, res: Response) => {
    try {

        // getting user_id form req.body doesn't make sense, soo
        // get the user fromt the token itself, means who is operating the service...
        const { id } = res.locals.user;

        // console.log(res.locals.user)

        // const user = await db.query.UserTable.findFirst({
        //     where: eq(UserTable.id, id)
        // })

        // if (!user) {
        //     return res.status(404).json({ message: "User not found" })
        // }

        const address = await db.insert(AddressTable).values({
            ...req.body,
            lineOne: req.body.line_one,
            lineTwo: req.body.line_two,
            userId: id
        })

        res.json({ data: address })
        
    } catch (err) {
        console.log("user not found")
        res.status(404).json({ message: "error while adding address" })
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const id = Number.parseInt(req.params.address_id);

        const deletedAddress = await db.delete(AddressTable).where(eq(AddressTable.id, id))

        res.json({data: deletedAddress})
    } catch (err) {
        console.log("error while deleting address")
        return res.status(404).json({ message: "user not found"})
    }
}

export const getAddresses = async (req: Request, res: Response) => {
    try {
        const addresses = await db.query.AddressTable.findMany({
            where: eq(AddressTable.userId, res.locals.user.id)
        })
    
        res.json({ data: addresses })
    } catch (error) {
        console.log("error while getting addresses")
        return res.status(404).json({ message: "user not found"})
    }
}