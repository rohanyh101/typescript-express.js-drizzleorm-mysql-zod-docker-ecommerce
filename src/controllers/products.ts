import type { Request, Response } from "express";
import { db } from "../database/db";
import { ProductTable } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const createProductHandler = async (req: Request, res: Response) => {
	// get the tags like ['tag1', 'tag2'] => 'tag1,tag2'
	// create a validator for comming requests

	try {
		const product = await db.insert(ProductTable).values({
			...req.body,
			tags: req.body.tags.join(","),
		});

		return res.json({ data: product });
	} catch (error) {
		console.log("error while creating product");
		return res.status(400).json({ message: "Error in creating product" });
	}
};

// get products with pagination...
export const getProductsHandler = async (req: Request, res: Response) => {
	// response...
	// {
	//     count: 100
	//     data: []
	// }

	try {
		const skip = Number.parseInt(req.query.skip as string) || 0;
		const limit = 5;

		const count = (await db.select().from(ProductTable)).length;
		const products = await db.query.ProductTable.findMany({
			offset: skip,
			limit,
		});

		return res.json({ count, data: products });
	} catch (error) {
		console.log("error while getting products");
		return res.status(400).json("product not found");
	}
};

export const getProductByIdHandler = async (req: Request, res: Response) => {
	try {
		const ProductId = Number.parseInt(req.params.product_id);

		const product = await db.query.ProductTable.findFirst({
			where: eq(ProductTable.id, ProductId),
		});

        if (!product) {
            return res.status(400).json({ message: "product not found" });
        }

		return res.json({ data: product });
	} catch (error) {
		console.log("error while getting single product");
		return res.status(400).json({ message: "product not found" });
	}
};

export const updateProductHandler = async (req: Request, res: Response) => {
	try {
		const product = req.body;
		if (product.tags) {
			product.tags = product.tags.join(",");
		}

		const ProductId = Number.parseInt(req.params.product_id);

		const updatedProduct = await db
			.update(ProductTable)
			.set(product)
			.where(eq(ProductTable.id, ProductId));

		return res.json({ data: updatedProduct });
	} catch (error) {
		console.log("error while updating product");
		return res.status(400).json({ message: "product not found" });
	}
};

export const deleteProductHandler = async (req: Request, res: Response) => {
	try {
		const ProductId = Number.parseInt(req.params.product_id);

		const deletedProduct = await db
			.delete(ProductTable)
			.where(eq(ProductTable.id, ProductId));

		return res.json({ data: deletedProduct });
	} catch (error) {
		console.log("error while deleting product");
		return res.status(400).json({ messahe: "product not found" });
	}
};
