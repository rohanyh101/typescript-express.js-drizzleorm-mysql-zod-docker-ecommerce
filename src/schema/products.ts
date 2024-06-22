import { z } from "zod";

export const CreateProductSchema = z.object({
	body: z.object({
		name: z.string().min(3, "Product name must be at least 3 characters long"),
		description: z
			.string()
			.min(10, "Product description must be at least 10 characters long"),
		price: z.number(),
		tags: z.array(z.string()),
	}),
});

export const getProductsSchema = z.object({
	query: z.object({
		skip: z.string().optional(),
	}),
});

export const getProductByIdSchema = z.object({
	params: z.object({
		product_id: z.string(),
	}),
});

export const deleteProductSchema = z.object({
	params: z.object({
		product_id: z.string(),
	}),
});

export const updateProductSchema = z.object({
	body: z.object({
		name: z
			.string()
			.min(3, "Product name must be at least 3 characters long")
			.optional(),
		description: z
			.string()
			.min(10, "Product description must be at least 10 characters long")
			.optional(),
		price: z.number().optional(),
		tags: z.array(z.string()).optional(),
	}),

	params: z.object({
		product_id: z.string(),
	}),
});
