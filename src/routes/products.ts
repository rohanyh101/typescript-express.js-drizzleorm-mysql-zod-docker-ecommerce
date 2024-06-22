import { Router } from "express";
import type { Request, Response } from "express";
import {
	createProductHandler,
	deleteProductHandler,
	getProductByIdHandler,
	getProductsHandler,
	updateProductHandler,
} from "../controllers/products";
import validateResource from "../middlewares/validate.resource";
import {
	CreateProductSchema,
	deleteProductSchema,
	getProductByIdSchema,
	getProductsSchema,
	updateProductSchema,
} from "../schema/products";
import requireUser from "../middlewares/requireUser";
import adminMiddleware from "../middlewares/admin";
import { db } from "../database/db";
import { ProductTable } from "../../drizzle/schema";
import type { TypeNewProduct } from "../../drizzle/schema";

const productRouter: Router = Router();

productRouter.use("/", [requireUser]);

productRouter.post(
	"/",
	[adminMiddleware, validateResource(CreateProductSchema)],
	createProductHandler,
);

productRouter.get("/", validateResource(getProductsSchema), getProductsHandler);

productRouter.get(
	"/:product_id",
	validateResource(getProductByIdSchema),
	getProductByIdHandler,
);

productRouter.put(
	"/:product_id",
	[adminMiddleware, validateResource(updateProductSchema)],
	updateProductHandler,
);

productRouter.delete(
	"/:product_id",
	[adminMiddleware, validateResource(deleteProductSchema)],
	deleteProductHandler,
);

productRouter.post("/data", adminMiddleware ,async (req: Request, res: Response) => {
	try {
		await db.insert(ProductTable).values(products);
		res.json({ message: "inserted all data" });
	} catch (error) {
		console.log("error while inserting dummy data");
		return res
			.status(400)
			.json({ message: "error while inserting dummy data" });
	}
});

export default productRouter;

const products: TypeNewProduct[] = [
	{
		name: "Titanium Alloy Wrist Watch",
		description:
			"Sleek and durable titanium alloy watch with sapphire crystal face and Japanese quartz movement.",
		price: "1499.99",
		tags: "watch, titanium, electronic, wrist, watch",
	},
	{
		name: "Vintage Leather Briefcase",
		description:
			"Handcrafted genuine leather briefcase with brass hardware and multiple compartments for organization.",
		price: "399.5",
		tags: "bag, leather, office, briefcase",
	},
	{
		name: "Noise-Cancelling Wireless Headphones",
		description:
			"High-fidelity wireless headphones with active noise cancellation and 30-hour battery life.",
		price: "249.99",
		tags: "audio, headphones, wireless, noise-cancelling",
	},
	{
		name: "Organic Cotton Bath Towel Set",
		description:
			"Luxuriously soft and absorbent organic cotton bath towels in a set of 3 with hanging loops.",
		price: "79.99",
		tags: "home, towel, cotton, bathroom",
	},
	{
		name: "Portable Espresso Machine",
		description:
			"Compact and lightweight espresso machine that makes professional-quality espresso on the go.",
		price: "99.95",
		tags: "kitchen, coffee, espresso, portable",
	},
	{
		name: "Stainless Steel Pocket Watch",
		description:
			"Classic stainless steel pocket watch with Roman numeral dial and mechanical movement.",
		price: "299.99",
		tags: "watch, pocket, mechanical, steel",
	},
	{
		name: "Leather Strap Smartwatch",
		description:
			"Stylish smartwatch with genuine leather strap, heart rate monitoring, and fitness tracking.",
		price: "199.99",
		tags: "watch, smartwatch, leather, electronic, fitness",
	},
	{
		name: "Wooden Bead Bracelet",
		description:
			"Handcrafted wooden bead bracelet with adjustable cord, perfect for casual wear.",
		price: "24.99",
		tags: "bracelet, wooden, beads, jewelry",
	},
	{
		name: "Diamond Stud Earrings",
		description:
			"Elegant 14k gold diamond stud earrings with 0.5 carat total weight.",
		price: "999.99",
		tags: "earrings, diamond, gold, jewelry",
	},
	{
		name: "Vintage Leather Briefcase",
		description:
			"Durable vintage-style leather briefcase with multiple compartments and a detachable shoulder strap.",
		price: "199.99",
		tags: "briefcase, leather, vintage, bag",
	},
	{
		name: "Bamboo Sunglasses",
		description:
			"Eco-friendly bamboo sunglasses with polarized lenses and UV400 protection.",
		price: "49.99",
		tags: "sunglasses, bamboo, eco-friendly, eyewear",
	},
	{
		name: "Stainless Steel Necklace",
		description:
			"Minimalist stainless steel necklace with a simple pendant design.",
		price: "59.99",
		tags: "necklace, steel, pendant, jewelry",
	},
	{
		name: "Leather Tote Bag",
		description:
			"Spacious leather tote bag with a classic design and durable construction.",
		price: "149.99",
		tags: "bag, tote, leather, fashion",
	},
	{
		name: "Wooden Cufflinks",
		description: "Unique wooden cufflinks with a sleek and modern appearance.",
		price: "39.99",
		tags: "cufflinks, wooden, accessories, fashion",
	},
	{
		name: "Leather Keychain",
		description:
			"Handmade leather keychain with a sturdy metal ring and a personalized engraving option.",
		price: "19.99",
		tags: "keychain, leather, accessories",
	},
	{
		name: "Titanium Alloy Bangle",
		description:
			"Durable titanium alloy bangle with a minimalist design and a comfortable fit.",
		price: "99.99",
		tags: "bangle, titanium, jewelry, accessories",
	},
	{
		name: "Wooden Bow Tie",
		description:
			"Stylish wooden bow tie with an adjustable strap for a perfect fit.",
		price: "29.99",
		tags: "bow tie, wooden, accessories, fashion",
	},
	{
		name: "Leather Wallet",
		description:
			"High-quality leather wallet with multiple card slots, a bill compartment, and a coin pouch.",
		price: "59.99",
		tags: "wallet, leather, accessories, fashion",
	},
	{
		name: "Wooden Sunglasses",
		description:
			"Eco-friendly wooden sunglasses with polarized lenses and UV400 protection.",
		price: "59.99",
		tags: "sunglasses, wooden, eco-friendly, eyewear",
	},
	{
		name: "Leather Backpack",
		description:
			"Stylish and durable leather backpack with multiple compartments and adjustable straps.",
		price: "199.99",
		tags: "backpack, leather, bag, fashion",
	},
	{
		name: "Wooden Earrings",
		description: "Unique wooden earrings with a modern and minimalist design.",
		price: "24.99",
		tags: "earrings, wooden, jewelry, accessories",
	},
	{
		name: "Leather Bracelet",
		description:
			"Adjustable leather bracelet with a simple and elegant design.",
		price: "29.99",
		tags: "bracelet, leather, jewelry, accessories",
	},
	{
		name: "Wooden Necklace",
		description: "Handcrafted wooden necklace with a unique pendant design.",
		price: "39.99",
		tags: "necklace, wooden, jewelry, accessories",
	},
	{
		name: "Leather Clutch",
		description:
			"Stylish leather clutch with a minimalist design and a detachable wrist strap.",
		price: "79.99",
		tags: "clutch, leather, bag, fashion",
	},
	{
		name: "Wooden Comb",
		description:
			"Eco-friendly wooden comb with a smooth finish and a sturdy design.",
		price: "9.99",
		tags: "comb, wooden, accessories, grooming",
	},
	{
		name: "Leather Keyring",
		description:
			"Durable leather keyring with a sturdy metal ring and a personalized engraving option.",
		price: "14.99",
		tags: "keyring, leather, accessories",
	},
	{
		name: "Wooden Coasters",
		description:
			"Set of four eco-friendly wooden coasters with a sleek design.",
		price: "19.99",
		tags: "coasters, wooden, home decor, eco-friendly",
	},
	{
		name: "Leather Luggage Tag",
		description:
			"High-quality leather luggage tag with a clear ID window and a sturdy metal ring.",
		price: "12.99",
		tags: "luggage tag, leather, accessories, travel",
	},
	{
		name: "Wooden Pen",
		description:
			"Eco-friendly wooden pen with a smooth writing experience and a unique design.",
		price: "7.99",
		tags: "pen, wooden, accessories, office",
	},
	{
		name: "Leather Keychain",
		description:
			"Handmade leather keychain with a sturdy metal ring and a personalized engraving option.",
		price: "19.99",
		tags: "keychain, leather, accessories",
	},
	{
		name: "Wooden Bottle Opener",
		description:
			"Eco-friendly wooden bottle opener with a sleek design and a sturdy construction.",
		price: "9.99",
		tags: "bottle opener, wooden, accessories, kitchen",
	},
	{
		name: "Leather Luggage Strap",
		description:
			"Durable leather luggage strap with a sturdy buckle and an adjustable length.",
		price: "24.99",
		tags: "luggage strap, leather, accessories, travel",
	},
	{
		name: "Wooden Coaster Set",
		description:
			"Set of six eco-friendly wooden coasters with a unique design and a sturdy construction.",
		price: "29.99",
		tags: "coasters, wooden, home decor, eco-friendly",
	},
	{
		name: "Leather Keychain",
		description:
			"Handmade leather keychain with a sturdy metal ring and a personalized engraving option.",
		price: "19.99",
		tags: "keychain, leather, accessories",
	},
	{
		name: "Wooden Utensil Set",
		description:
			"Eco-friendly wooden utensil set with a spoon, fork, and knife for outdoor use.",
		price: "14.99",
		tags: "utensils, wooden, accessories, kitchen, outdoor",
	},
	{
		name: "Leather Luggage Tag",
		description:
			"High-quality leather luggage tag with a clear ID window and a sturdy metal ring.",
		price: "12.99",
		tags: "luggage tag, leather, accessories, travel",
	},
	{
		name: "Wooden Pen Holder",
		description:
			"Eco-friendly wooden pen holder with a sleek design and a sturdy construction.",
		price: "14.99",
		tags: "pen holder, wooden, accessories, office",
	},
	{
		name: "Leather Keychain",
		description:
			"Handmade leather keychain with a sturdy metal ring and a personalized engraving option.",
		price: "19.99",
		tags: "keychain, leather, accessories",
	},
	{
		name: "Wooden Bottle Stopper",
		description:
			"Eco-friendly wooden bottle stopper with a unique design and a tight seal.",
		price: "7.99",
		tags: "bottle stopper, wooden, accessories, kitchen",
	},
	{
		name: "Leather Luggage Tag",
		description:
			"High-quality leather luggage tag with a clear ID window and a sturdy metal ring.",
		price: "12.99",
		tags: "luggage tag, leather, accessories, travel",
	},
	{
		name: "Wooden Coaster Set",
		description:
			"Set of four eco-friendly wooden coasters with a unique design and a sturdy construction.",
		price: "24.99",
		tags: "coasters, wooden, home decor, eco-friendly",
	},
	{
		name: "Leather Keychain",
		description:
			"Handmade leather keychain with a sturdy metal ring and a personalized engraving option.",
		price: "19.99",
		tags: "keychain, leather, accessories",
	},
	{
		name: "Wooden Utensil Set",
		description:
			"Eco-friendly wooden utensil set with a spoon, fork, and knife for outdoor use.",
		price: "14.99",
		tags: "utensils, wooden, accessories, kitchen, outdoor",
	},
	{
		name: "Leather Luggage Tag",
		description:
			"High-quality leather luggage tag with a clear ID window and a sturdy metal ring.",
		price: "12.99",
		tags: "luggage tag, leather, accessories, travel",
	},
	{
		name: "Wooden Pen Holder",
		description:
			"Eco-friendly wooden pen holder with a sleek design and a sturdy construction.",
		price: "14.99",
		tags: "pen holder, wooden, accessories, office",
	},
	{
		name: "Leather Keychain",
		description:
			"Handmade leather keychain with a sturdy metal ring and a personalized engraving option.",
		price: "19.99",
		tags: "keychain, leather, accessories",
	},
	{
		name: "Wooden Bottle Stopper",
		description:
			"Eco-friendly wooden bottle stopper with a unique design and a tight seal.",
		price: "7.99",
		tags: "bottle stopper, wooden, accessories, kitchen",
	},
	{
		name: "Leather Luggage Tag",
		description:
			"High-quality leather luggage tag with a clear ID window and a sturdy metal ring.",
		price: "12.99",
		tags: "luggage tag, leather, accessories, travel",
	},
	{
		name: "Wooden Coaster Set",
		description:
			"Set of four eco-friendly wooden coasters with a unique design and a sturdy construction.",
		price: "24.99",
		tags: "coasters, wooden, home decor, eco-friendly",
	},
	{
		name: "Leather Keychain",
		description:
			"Handmade leather keychain with a sturdy metal ring and a personalized engraving option.",
		price: "19.99",
		tags: "keychain, leather, accessories",
	},
	{
		name: "Wooden Utensil Set",
		description:
			"Eco-friendly wooden utensil set with a spoon, fork, and knife for outdoor use.",
		price: "14.99",
		tags: "utensils, wooden, accessories, kitchen, outdoor",
	},
	{
		name: "Leather Luggage Tag",
		description:
			"High-quality leather luggage tag with a clear ID window and a sturdy metal ring.",
		price: "12.99",
		tags: "luggage tag, leather, accessories, travel",
	},
	{
		name: "Wooden Pen Holder",
		description:
			"Eco-friendly wooden pen holder with a sleek design and a sturdy construction.",
		price: "14.99",
		tags: "pen holder, wooden, accessories, office",
	},
	{
		name: "Leather Keychain",
		description:
			"Handmade leather keychain with a sturdy metal ring and a personalized engraving option.",
		price: "19.99",
		tags: "keychain, leather, accessories",
	},
	{
		name: "Wooden Bottle Stopper",
		description:
			"Eco-friendly wooden bottle stopper with a unique design and a tight seal.",
		price: "7.99",
		tags: "bottle stopper, wooden, accessories, kitchen",
	},
];
